import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClusterRoutingModule } from './cluster-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatSortModule} from '@angular/material/sort';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatOptionModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogLogsComponent } from './shared/dialog/dialog-logs/dialog-logs.component';
import { LogsComponent } from './shared/dialog/dialog-logs/logs.componen';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BalanceComponent } from './balance/balance.component';
import { DepositsChartComponent } from './deposits-chart/deposits-chart.component';
import { TradesComponent } from './trades/trades.component';
import { LoginsComponent } from './logins/logins.component';
import { DepositsComponent } from './deposits/deposits.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BalanceComponent,
    DepositsComponent,
    DepositsChartComponent,
    TradesComponent,
    LoginsComponent,
    LogsComponent,
    DialogLogsComponent,
  ],
  imports: [
    FontAwesomeModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatStepperModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClusterRoutingModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule,
    ClipboardModule,
    MatBadgeModule,
    SharedModule,
    NgxChartsModule,
  ],
  providers:[
  ],
  exports: [
    DialogLogsComponent
  ],
  entryComponents:[
    DialogLogsComponent
  ],
  bootstrap: [
    DialogLogsComponent
  ]
})
export class MainModule { }
