import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog-log',
  template: `
    <app-logs [config]="config" 
    (onCancel)="onCancelClick()">  
    </app-logs>
  `
})
export class DialogLogsComponent {  
  constructor(
    public dialogRef: MatDialogRef<DialogLogsComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogLogsConfig) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(dialogResult: DialogResult){
    this.dialogRef.close(dialogResult);
  }

}
