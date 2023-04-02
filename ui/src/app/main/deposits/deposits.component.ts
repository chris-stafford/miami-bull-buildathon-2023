import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss'],
})
export class DepositsComponent implements OnInit {
  sub: Subscription;
  single: any[];
  view: any[] = [150, 150];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  @Input() value: number = 0;
  previousValue: number = 0;
  units: string = 'Total';

  constructor() {}

  ngOnInit(){
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
