import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select',
  templateUrl: './dialog-select.component.html',
  styleUrls: ['./dialog-select.component.scss']
})
export class DialogSelectComponent implements OnInit {
  inputValue: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogInputConfig) { }

  ngOnInit() {
    this.config.title = this.config.title  || 'Confirm';
    this.config.cancelText = this.config.cancelText  || 'No';
    this.config.confirmText = this.config.confirmText  || 'Yes';
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
