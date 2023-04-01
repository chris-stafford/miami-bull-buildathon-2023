import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, Validators } from '@angular/forms';
import Decimal from 'decimal.js';
import { AlertMessageService } from 'src/app/shared/alertMessage.service';
import * as _ from 'lodash';
import { CryptoAmountHelper } from 'src/app/shared/cryptoAmount.helper';
import { DateTimeHelper } from 'src/app/shared/dateTime.helper';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {  
  @Input() config: DialogLogsConfig;
  @Output() onCancel = new EventEmitter<DialogResult>();
  logs: Array<string> = [];

  constructor(
    private alertMsgService: AlertMessageService,
    public dateTimeHelper: DateTimeHelper) {}

  ngOnInit() {    
    this.config = this.config ? this.config : { event: 'ExpandLogs'} as DialogLogsConfig;
    this.config.title = this.config.title || `Pod Container logs`;
    this.config.cancelText = this.config.cancelText  || 'Close';
    this.config.errors = this.config.errors ? this.config.errors : 0;
    this.logs = this.config.logs;
  }

  showCopyLogsSuccessMessage(){
    this.alertMsgService.showSuccessMessage(
      `Pod logs copied to the clipboard`,
      `Logs Copied`);
  }
  
  onCancelClick(): void {
    this.onCancel.emit();
  }
}
