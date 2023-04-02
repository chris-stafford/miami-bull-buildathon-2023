import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageService } from 'src/app/shared/alertMessage.service';
import { AuthenticationService } from '../shared/authentication.service';
import {Location} from '@angular/common';
import { JwtService } from '../shared/jwt/jwt.service';
import { FormControl, Validators } from '@angular/forms';
import { Web3Service } from '../shared/web3.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
  })

export class LoginComponent implements OnInit {
    showLoginDetails: boolean;
    returnUrl: string;
    walletAddress: string;
    referralWalletAddress: string;
    walletAddressFromControl: FormControl;
    referralWalletAddressFormControl: FormControl;
    referralChecked: FormControl;
    accountsForLogin: Array<string> = [];
    referralCheckedValue = false;

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
        this.web3Service.getAccounts().then(accounts =>{
            this.accountsForLogin = accounts;
          })
          .catch(error => {
            console.log(error);
          });
        this.walletAddressFromControl = new FormControl({value: '', disabled: false}, [
            Validators.required
        ]);
        this.referralWalletAddressFormControl = new FormControl({value: '', disabled: false}, [
            Validators.required
        ]);
        this.referralChecked = new FormControl({value: '', disabled: false}, []);
    }

    onWalletAddressChange(){
        this.walletAddress = this.walletAddressFromControl.value;
    }
    onReferralWalletAddressChange(){
        this.referralWalletAddress = this.referralWalletAddressFormControl.value;
    }
    onReferralCheckChange(value){
        this.referralCheckedValue = value.checked;
        if(!this.referralCheckedValue){
            this.referralWalletAddressFormControl.setValue(undefined);
            this.referralWalletAddress = undefined;
        }
    }

    isValidForm(){
        return (this.walletAddress !== undefined && !this.referralCheckedValue) ||
        (this.referralCheckedValue && this.walletAddress !== undefined && this.referralWalletAddress !== undefined);
    }

    login() {
        this.spinnerService.show('loginSpinner');
        let promise: Promise<any>;
        if(!this.referralCheckedValue){                        
            this.recordNewLogin();                 
        } else {
            promise = this.web3Service.verifyReferral(this.walletAddress, this.referralWalletAddress).then(result => {                
                this.recordNewLogin();                
            }).catch(error => this.alertMsgService.showErrorMessage(`Error on applying referral: ${error}`))
            .finally(()=> this.spinnerService.hide('loginSpinner'));     
        }        
    }
    recordNewLogin(){
        this.web3Service.recordNewLogin(this.walletAddress).then(result => {
            this.jwtService.setToken(this.walletAddress);
            this.router.navigate(['/']);
        }).catch(error => this.alertMsgService.showErrorMessage(`Error on Login: ${error}`))
        .finally(()=> this.spinnerService.hide('loginSpinner'));    
    }
}