import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageService } from 'src/app/shared/alertMessage.service';
import { AuthenticationService } from '../shared/authentication.service';
import {Location} from '@angular/common';
import { JwtService } from '../shared/jwt/jwt.service';
import { FormControl, Validators } from '@angular/forms';
import { Web3Service } from '../shared/web3.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
  })

export class LoginComponent implements OnInit {
    showLoginDetails: boolean;
    returnUrl: string;
    walletAddress: string;
    walletAddressFromControl: FormControl;

    constructor(
        private authenticationService: AuthenticationService,
        private alertMsgService: AlertMessageService,
        private web3Service: Web3Service,
        private router:Router, 
        private activatedRoute: ActivatedRoute,
        private spinnerService: NgxSpinnerService,
        private jwtService: JwtService) { }

    ngOnInit() {
        let currentRoute = this.router.url.toLowerCase();
        if(currentRoute.indexOf('token') != -1){
           this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/']));
        }else{
            if(!this.authenticationService.isAuthenticated()){
                this.showLoginDetails = true;
                this.initForm();
            }else {
                this.router.navigate(['/']);
            }
        }
    }

    initForm(){
        this.walletAddressFromControl = new FormControl({value: '', disabled: false}, [
            Validators.required
        ]);
    }

    onWalletAddressChange(){
        this.walletAddress = this.walletAddressFromControl.value;
    }

    login() {
        this.spinnerService.show('loginSpinner');
        this.web3Service.recordNewLogin(this.walletAddress).then(result => {
            debugger;
            this.jwtService.setToken(this.walletAddress);
            this.router.navigate(['/']);
        }).catch(error => this.alertMsgService.showErrorMessage(`Error on Login: ${error}`))
        .finally(()=> this.spinnerService.hide('loginSpinner'));        
    }
}