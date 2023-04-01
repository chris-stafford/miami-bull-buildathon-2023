import { Injectable, OnInit, Inject } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG } from '../../config/app.config';
import * as _ from 'lodash';

export enum Roles {
  MiamiBullViewOnly = 'MiamiBullViewOnly',
  MiamiBullAdmin = 'MiamiBullAdmin',
  MiamiBullRestartCluster = 'MiamiBullRestartCluster',
  MiamiBullRestartPod = 'MiamiBullRestartPod'
}

@Injectable({
  providedIn: 'root'
})
export class JwtService implements OnInit{
  config: AppConfig;

  constructor(private toastr: ToastrService, @Inject(APP_CONFIG) config: AppConfig) {
    this.config = config;
  }

  ngOnInit()
  {
  }

  getTokenData(): Token {
    //gets token from config (local development) or local storage
    let tokenDecodedData;
    let jwt = this.getToken();
    if(!this.isEmptyOrUndefined(jwt)){
      tokenDecodedData = this.decodeToken(jwt);      
      if(this.isEmptyOrUndefined(tokenDecodedData)){
        this.showJWTArrayNullErrorMessage();
      }
    }
    return tokenDecodedData
  }

  getToken():string {
    let storedToken = localStorage.getItem('JWT_MIAMIBULL_TOKEN');
    return !this.isEmptyOrUndefined(storedToken) ? 
    storedToken : this.config.cwtToken;
  }
  getRefreshToken():string {
    let storedToken = localStorage.getItem('JWT_MIAMIBULL_REFRESH_TOKEN');
    return !this.isEmptyOrUndefined(storedToken) ? 
    storedToken : this.config.cwtToken;
  }

  setToken(token: string){
    localStorage.setItem('JWT_MIAMIBULL_TOKEN', token);
  }
  setRefreshToken(token: string){
    localStorage.setItem('JWT_MIAMIBULL_REFRESH_TOKEN', token);
  }
  removeToken(){
    localStorage.removeItem('JWT_MIAMIBULL_TOKEN');
  }
  removeRefreshToken(){
    localStorage.removeItem('JWT_MIAMIBULL_REFRESH_TOKEN');
  }

  isEmptyOrUndefined(value): boolean{
    return (value === undefined || value === null || value === 'undefined' || value === '');
  }

  getUserName(){
    let username = '';
    let tokenData: Token = this.getTokenData();
    if(tokenData && tokenData.nickname){
      username = tokenData.nickname
    }
    return username;
  }

  getViewOnlyPermission(){
    let tokenData: Token = this.getTokenData();
    if(tokenData && tokenData.roles){
      let roles: Array<string> = tokenData.roles ? tokenData.roles : [];
      var flag = _.some(roles, (scope: string) => {return scope === Roles.MiamiBullViewOnly});
      return flag;
    }
  }

  getEditAdminPermission(){
    let tokenData: Token = this.getTokenData();
    if(tokenData && tokenData.roles){
      let roles: Array<string> = tokenData.roles ? tokenData.roles : [];
      var flag = _.some(roles, (scope: string) => {return scope === Roles.MiamiBullAdmin});
      return flag;
    }
  }
  isAuthenticated() : boolean{
    return this.getToken() != null || this.getToken() != undefined;
  }

  // isAuthenticated(){
  //   try {
  //     let tokenData: Token = this.getTokenData();
  //     if(tokenData && tokenData.exp){
  //       if (Date.now() >= tokenData.exp * 1000) {
  //         return false;
  //       }else {
  //         return true;
  //       }
  //     }
  //     return false;
  //   } catch (err) {
  //     return false;
  //   }
  // }

  decodeToken(token: string): Token {
    try{
        return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  showJWTNullErrorMessages(){
    this.toastr.error('JWT is null. Roles could not be applied!','Error!',
    {
      timeOut: 10000,
      closeButton: true
    });
  }

  showJWTArrayNullErrorMessage(){
    this.toastr.error('JWT could not be decoded. Roles could not be applied!','Error!',
    {
      timeOut: 10000,
      closeButton: true
    });
  }
}
