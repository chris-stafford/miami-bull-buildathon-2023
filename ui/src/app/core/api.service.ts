import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { JwtService } from '../shared/jwt/jwt.service';

import { APP_CONFIG } from '../config/app.config';
import { Router } from '@angular/router';

export enum ApiType {
  MiamiBullApi = 0,
  Web3Api = 1
}


/**
 * ApiService: calling remote RESTful APIs.
 */
@Injectable()
export class ApiService {

  public jwtToken: string = '';

  private headers: HttpHeaders;

  private miamibullApiUrl: string = '';
  private web3ApiEndpoint: string = '';

  constructor(
    private http: HttpClient, 
    private jwtService: JwtService, 
    private router:Router,
    @Inject(APP_CONFIG) config: AppConfig) {
    this.miamibullApiUrl = config.miamibullApiEndpoint;
    this.web3ApiEndpoint = config.web3ApiEndpoint;
    this.loadHeaders();
  }

  private loadHeaders(){
    this.jwtToken = this.jwtService.getToken();
    if(this.jwtToken && !this.jwtService.isAuthenticated()){
      this.logout();
    }
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    });
  }

  logout() {
    this.jwtService.removeToken();
    this.jwtService.removeRefreshToken();
    this.router.navigate(['/login']);
  }

  public getApiUrl(apiType: ApiType): string {
    switch (apiType) {
      case ApiType.MiamiBullApi:
        return this.miamibullApiUrl;
      case ApiType.Web3Api:
        return this.web3ApiEndpoint;
    }
  }

/**
 * @param path url path to get resource.
 * @param term optional search term.
 * @return A obserable object to wrap the response result.
 */
  public get(apiType: ApiType, path: string, term?: any, isGetFileRequest: boolean = false): Observable<any> {
    this.loadHeaders();
    let apiUrl = this.getApiUrl(apiType);
    console.log('get resources from url:' + `${apiUrl}${path}`);
    let search = new HttpParams();

    if (term) {
      Object.keys(term).forEach(key => search.set(key, term[key]));
    }

    if(isGetFileRequest){
      this.headers = new HttpHeaders({
        'Content-Type': 'text/plain',
        'Accept': 'application/octet-stream',
        'Authorization': `Bearer ${this.jwtService.getToken()}`,
        'Response-Type': 'text'
      });      
      return this.http.get(`${apiUrl}${path}`, {params: search, headers: this.headers, responseType: 'text' })
      .pipe(catchError(this.handleError));
    } else {
      return this.http.get(`${apiUrl}${path}`, {params: search, headers: this.headers})
      .pipe(map(this.extractData),
      catchError(this.handleError));
    }
    
  }

  public post(apiType: ApiType, path: string, data: any): Observable<any> {
    this.loadHeaders();
    let apiUrl = this.getApiUrl(apiType);
    let body = JSON.stringify(data);
    return this.http.post(`${apiUrl}${path}`, body, { headers: this.headers })
        .pipe(map(this.extractData),
        catchError(this.handleError));
  }

  public put(apiType: ApiType, path: string, data: any): Observable<any> {
    this.loadHeaders();
    let apiUrl = this.getApiUrl(apiType);
    let body = JSON.stringify(data);

    return this.http.put(`${apiUrl}${path}`, body, { headers: this.headers })
        .pipe(map(this.extractData),
        catchError(this.handleError));
  }

  public delete(apiType: ApiType, path: string): Observable<any> {
    this.loadHeaders();
    let apiUrl = this.getApiUrl(apiType);
    return this.http.delete(`${apiUrl}${path}`, { headers: this.headers })
        .pipe(map(this.extractData),
        catchError(this.handleError));
  }

  public setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  public setHeader(key: string, value: string) {
    this.headers.set(key, value);
  }

  public deleteHeader(key: string) {
    if (this.headers.has(key)) {
      this.headers.delete(key);
    } else {
      console.log(`header:${key} not found!`);
    }
  }

  private extractData(res: Response): Array<any> | any {
    if (res && res.status >= 200 && res.status <= 300) {
      return res.json() || {};
    }

    return res;
  }

  private handleError(error: any) {
    // TODO: use a remote logging infrastructure
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); 
    error.body = error._body ? JSON.parse(error._body) as ErrorResponseBody : error._body;
    return throwError(error);
  }

}
