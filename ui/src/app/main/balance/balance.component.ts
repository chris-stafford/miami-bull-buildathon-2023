import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
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
  view: any[] = [350, 200];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

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
