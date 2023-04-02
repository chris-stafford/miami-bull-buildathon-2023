import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-input-trade',
  templateUrl: './dialog-input-trade.component.html',
  styleUrls: ['./dialog-input-trade.component.scss']
})
export class DialogInputTradeComponent implements OnInit {
  inputAmountValue: string = "";
  inputCurrencyValue: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogInputTradeComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogInputConfig) { }

  ngOnInit() {
    this.config.title = this.config.title  || 'Confirm';
    this.config.cancelText = this.config.cancelText  || 'No';
    this.config.confirmText = this.config.confirmText  || 'Yes';
    this.config.maxInputLength = this.config.maxInputLength || 50;
  }

  isValidForm() {
    return this.inputAmountValue;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(){
    if(!this.config.inputEnabled){
      this.dialogRef.close(true);
    } else{
      let tradeDetails: TradeDetails =
      {
        amount: this.inputAmountValue, 
        toDepositCurrency: this.inputCurrencyValue ? true : false
      };
      this.dialogRef.close(tradeDetails);
    }
  }

}
