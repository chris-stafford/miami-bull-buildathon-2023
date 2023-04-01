import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss']
})
export class DatepickerInputComponent implements OnInit {
  @Input() model;
  @Output() modelChange = new EventEmitter();
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() inputDisabled: boolean;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
    this.title = this.title || 'Choose a date'
  }
  onChangeEvent(event){
    this.modelChange.emit(event.target.value);
  }

}
