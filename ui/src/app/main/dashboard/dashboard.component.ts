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
  balance;
  achievementsAvailableToMint: Array<any>;
  achievementsIssued: Array<any>;
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
    this.setDashboard();
    this.userWalletAddress = this.jwtService.getToken();
  }

  setDashboard() {
    this.web3Service.getDashboard().then((result: DashboardResponse) => {
      debugger;
      this.loginsCounter = _.toInteger(result.numLogins);
      this.tradesCounter = _.toInteger(result.numTrades);
      this.depositsCounter = _.toInteger(result.deposits);
      this.balance = _.toInteger(result.balance);
      this.achievementsAvailableToMint = result.achievementsAvailableToMint;
      this.achievementsIssued = result.achievementsIssued;
    }).catch(error => console.log(error));        
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
          inputEnabled: true
        };
        dialogRef = this.dialog.open(DialogInputComponent, {
          width: width,
          data: dialogAddDepositConfig,
          disableClose: true,
        }); 
        break;
      case 'AddAchievement':
        let dialogAddAchievementConfig: DialogInputConfig = {
          event: event,
          text: `Please add the Achievement id`,
          isAlertDialog: false,
          inputEnabled: true
        };
        dialogRef = this.dialog.open(DialogInputComponent, {
          width: width,
          data:dialogAddAchievementConfig,
          disableClose: true,
        });
        break;
      case 'AddReferral':
        let dialogAddReferralConfig: DialogInputConfig = {
          event: event,
          text: `Please add the new Referral Account Address`,
          isAlertDialog: false,
          inputEnabled: true
        };
        dialogRef = this.dialog.open(DialogInputComponent, {
          width: width,
          data:dialogAddReferralConfig,
          disableClose: true,
        });
        break;
      default:
        break;
    }
    
 
    dialogRef.afterClosed().subscribe((result: any) => {
      debugger;
      if(result){
        switch (event) {
          case 'AddDeposit':  
          this.addDeposit(result);
            break;
          case 'AddAchievement':
            break;
          case 'AddReferral':
            break;
        }    
      }
    });
  }


  addDeposit(depositAmount) {
    this.web3Service.recordNewDeposit(depositAmount).then(result => {
      this.depositsCounter += _.parseInt(depositAmount);
      this.alertMsgService.showSuccessMessage(`Deposit of ${depositAmount} added!`);
    }).catch(error => this.alertMsgService.showErrorMessage(`Error adding deposit. Error: ${error}`));  
  }

  addTrade(event) {
    this.tradesCounter++;
  }
  addLogin(){
    this.web3Service.recordNewLogin(this.userWalletAddress).then(response => {
      debugger;
      if(response.status){
        this.alertMsgService.showSuccessMessage(`New Login added for "${this.userWalletAddress}" address!`);
        this.loginsCounter++;
      }
    }).catch(error => this.alertMsgService.showErrorMessage(`Error adding deposit. Error: ${error}`));
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
