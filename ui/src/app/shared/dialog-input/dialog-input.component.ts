import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.scss']
})
export class DialogInputComponent implements OnInit {
  inputValue: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogInputComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogInputConfig) { }

  ngOnInit() {
    this.config.title = this.config.title  || 'Confirm';
    this.config.cancelText = this.config.cancelText  || 'No';
    this.config.confirmText = this.config.confirmText  || 'Yes';
    this.config.maxInputLength = this.config.maxInputLength || 50;
  }

  isValidForm(inputValue) {
    return !this.config.inputEnabled || (this.config.inputEnabled && inputValue && inputValue.length > 0);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(inputValue: string){
    if(!this.config.inputEnabled){
      this.dialogRef.close(true);
    } else{
      this.dialogRef.close(inputValue);
    }
  }

}
