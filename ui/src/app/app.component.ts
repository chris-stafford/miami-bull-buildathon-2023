import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { JwtService } from './shared/jwt/jwt.service';
import { environment } from '../environments/environment';
import { AuthenticationService } from './shared/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MiamiBull';
  environment = environment;
  accountId = '';

  constructor(public authenticationService: AuthenticationService,
              private router:Router, 
              private location: Location,
              private spinnerService: NgxSpinnerService,
              public jwtService: JwtService) {
  }

  ngOnInit(){
    let currentRoute = this.router.url.toLowerCase();
      if(currentRoute.indexOf('token') != -1){
        if(!this.authenticationService.isAuthenticated()){
          this.logout();
        }
      }
  }
  
  getSpinnerName():string {
    switch (this.environment.name) {
      case 'dev':
        return 'pacman';   
      case 'stg':
        return 'ball-beat';    
      case 'prod':
          return 'ball-spin-clockwise';
      default:
        return 'ball-pulse';
    }
  }

  logout() {
    this.spinnerService.show('loginSpinner');
    this.jwtService.removeToken(); 
    this.router.navigate(['/login']);
    this.spinnerService.hide('loginSpinner');
  }

  // logout() {
  //   this.spinnerService.show('loginSpinner');
  //   this.authenticationService.getLogoutUrl().toPromise().then((logoutUrl: string) => {   
  //     this.jwtService.removeToken();
  //     this.jwtService.removeRefreshToken();     
  //     this.location.replaceState('/'); // clears browser history so they can't navigate with back button     
  //     window.location.href = logoutUrl;
  //   }).catch(() => {    
  //     this.spinnerService.hide('loginSpinner');
  //   })
  //   .finally(() => {    
  //       this.spinnerService.hide('loginSpinner');
  //   }); 
  // }

}