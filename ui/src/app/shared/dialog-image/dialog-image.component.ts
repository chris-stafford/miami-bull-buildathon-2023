import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.scss']
})
export class DialogImageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogInputConfig) { }

  ngOnInit() {
    this.config.title = this.config.title  || 'Image Preview';
    this.config.cancelText = this.config.cancelText  || 'Close';
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
