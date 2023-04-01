import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { ApiService, ApiType } from 'src/app/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthenticationService {
    constructor(private api: ApiService,
        private router:Router, 
        private location:Location, 
        private jwtService: JwtService) { 
        }
    private apiUrl = this.api.getApiUrl(ApiType.MiamiBullApi);
    private BASE_PATH = 'v1/Authentication';

    isAuthenticated() : boolean{
       return this.jwtService.isAuthenticated();
    }

    getLoginUrl(returnUrl?: string): Observable<string>{
        returnUrl = returnUrl ? returnUrl : window.location.origin;
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        return this.api.get(ApiType.MiamiBullApi, `${this.BASE_PATH}/loginUrl?returnUrl=${returnUrl}/token`,{});
    }

    getLogoutUrl(returnUrl?: string): Observable<string>{
        returnUrl = returnUrl ? returnUrl : window.location.origin;
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        return this.api.get(ApiType.MiamiBullApi, `${this.BASE_PATH}/logoutUrl?returnUrl=${returnUrl}`,{});
    }

    getToken(authCode: string, returnUrl?: string): Observable<TokenModel>  {  
        returnUrl = returnUrl ? returnUrl : window.location.origin + '/token';
        this.location.replaceState('/'); // clears browser history so they can't navigate with back button      
        return this.api.get(ApiType.MiamiBullApi, `${this.BASE_PATH}/token?code=${authCode}&returnUrl=${returnUrl}`,{});
    }
}