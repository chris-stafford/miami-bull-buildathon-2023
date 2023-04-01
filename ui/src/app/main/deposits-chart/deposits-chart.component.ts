import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'app-deposits-chart',
  templateUrl: './deposits-chart.component.html',
  styleUrls: ['./deposits-chart.component.scss'],
})
export class DepositsChartComponent implements OnInit {
  sub: Subscription;
  data = [
    {
      "name": "Jan",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "February",
      "value": 33000,
      "extra": {
        "code": "feb"
      }
    },
    {
      "name": "March",
      "value": 35800,
      "extra": {
        "code": "mar"
      }
    }
  ];

  view: any[] = [400, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '2023';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
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
