import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import * as _ from "lodash";
import { DateTimeHelper } from 'src/app/shared/dateTime.helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { Moment } from 'moment';
import { AlertMessageService } from 'src/app/shared/alertMessage.service';
import { ThemePalette } from '@angular/material/core';
import { JwtService } from 'src/app/shared/jwt/jwt.service';
import { DialogInputComponent } from 'src/app/shared/dialog-input/dialog-input.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Web3Service } from 'src/app/shared/web3.service';
import { DialogInputTradeComponent } from 'src/app/shared/dialog-input-trade/dialog-input-trade.component';
import { DialogSelectComponent } from 'src/app/shared/dialog-select/dialog-select.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public selectedTabIndex = 0;
  tradesCounter = 0;
  loginsCounter = 0;
  depositsCounter = 0;
  balance = 0;
  achievementsAvailableToMint: Array<any>;
  availableAccounts: Array<string> = [];
  achievementsIssued: Array<AchievementsIssued>;
  sub: Subscription;
  data = [
    {
      "name": "Gains",
      "value": 8940000
    },
    {
      "name": "Losses",
      "value": 5000000
    },
  ];
  view: any[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  userWalletAddress: string;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private web3Service: Web3Service,
              private spinnerService: NgxSpinnerService,
              private alertMsgService: AlertMessageService,
              private jwtService: JwtService,
              private dialog: MatDialog) {}

  ngOnInit(){
    this.web3Service.getAccounts().then(accounts =>{
        this.availableAccounts = accounts;
      })
      .catch(error => {
        console.log(error);
      });
    this.setDashboard();
    this.userWalletAddress = this.jwtService.getToken();
  }

  setDashboard() {
    this.web3Service.getDashboard().then((result: DashboardResponse) => {
      this.loginsCounter = _.toInteger(result.numLogins);
      this.tradesCounter = _.toInteger(result.numTrades);
      this.depositsCounter = _.toInteger(result.deposits);
      this.balance = _.toInteger(result.balance);
      this.achievementsAvailableToMint = result.achievementsAvailableToMint;
      this.achievementsIssued = result.achievementsIssued;
    }).catch(error => this.alertMsgService.showErrorMessage(`Error on getting dashboard. Error: ${error}`));        
  }

  openDialog(event: string, width = '350px') {    
    let dialogConfig;
    let dialogRef;
    let elementToChange = '';
    
    switch (event) {
      case 'AddDeposit':
        let dialogAddDepositConfig: DialogInputConfig = {
          event: event,
          text: `Please enter the deposit amount`,
          isAlertDialog: false,
          inputEnabled: true,
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        };
        dialogRef = this.dialog.open(DialogInputComponent, {
          width: width,
          data: dialogAddDepositConfig,
          disableClose: true,
        }); 
        break;
      case 'AddTrade':
        let dialogAddTradeConfig: DialogInputConfig = {
          event: event,
          text: `Please enter the trade details`,
          isAlertDialog: false,
          inputEnabled: true,
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        };
        dialogRef = this.dialog.open(DialogInputTradeComponent, {
          width: width,
          data: dialogAddTradeConfig,
          disableClose: true
        }); 
        break;
      case 'AddReferral':
        let dialogAddReferralConfig: DialogInputConfig = {
          event: event,
          text: `Please select the Referral Account Address`,
          isAlertDialog: false,
          inputEnabled: true,
          options: this.availableAccounts,
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        };
        dialogRef = this.dialog.open(DialogSelectComponent, {
          width: width,
          data:dialogAddReferralConfig,
          disableClose: true,
        });
        break;
      default:
        break;
    }
    
 
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        switch (event) {
          case 'AddDeposit':  
          this.addDeposit(result);
            break;
          case 'AddAchievement':
            break;
          case 'AddReferral':
            this.addReferral(result);
            break;
          case 'AddTrade':
            this.addTrade(result);
            break;
        }    
      }
    });
  }

  addDeposit(depositAmount) {
    this.web3Service.recordNewDeposit(depositAmount).then(result => {
      this.depositsCounter += _.parseInt(depositAmount);
      this.alertMsgService.showSuccessMessage(`Deposit of ${depositAmount} added!`);
      this.setDashboard();
    }).catch(error => this.alertMsgService.showErrorMessage(`Error adding deposit. Error: ${error}`));  
  }
  addReferral(referralAddress){
    this.web3Service.recordNewReferral(referralAddress).then(result => {
      this.alertMsgService.showSuccessMessage(`New referral created for ${referralAddress}`);
      this.setDashboard();
    }).catch(error => this.alertMsgService.showErrorMessage(`Error adding referral. Error: ${error}`));  
  }
  addLogin(){
    this.web3Service.recordNewLogin(this.userWalletAddress).then(response => {
      if(response.status){
        this.alertMsgService.showSuccessMessage(`New Login added for "${this.userWalletAddress}" address!`);
        this.setDashboard();
      }
    }).catch(error => this.alertMsgService.showErrorMessage(`Error adding login. Error: ${error}`));
  }

  addTrade(tradeDetails: TradeDetails) {
    this.web3Service.recordNewTrade(tradeDetails.amount, tradeDetails.toDepositCurrency).then(response => {
      if(response.status){
        this.alertMsgService.showSuccessMessage(`New Trade added related to "${this.userWalletAddress}" address!`);
        this.setDashboard();
      }
    }).catch(error => this.alertMsgService.showErrorMessage(`Error adding Trade. Error: ${error}`));
  }


  mint(achievementId) {
    this.web3Service.mint(achievementId).then(response => {
      if(response.status){
        this.alertMsgService.showSuccessMessage(`Achievement ${achievementId} minted!`);
        this.setDashboard();
      }
    }).catch(error => this.alertMsgService.showErrorMessage(`Error no mint. Error: ${error}`));
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
