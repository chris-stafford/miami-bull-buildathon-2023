import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SpinnerComponent } from './spinner/spinner.component';
import { DatepickerInputComponent } from './datepicker-input/datepicker-input.component';
import { DialogInputComponent } from './dialog-input/dialog-input.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatMenuModule} from '@angular/material/menu';
import { MatOptionModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import { CryptoAmountHelper } from './cryptoAmount.helper';
import { DateTimeHelper } from './dateTime.helper';
import { CounterDirective } from './counter.directive';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
import { AlertMessageService } from './alertMessage.service';
import { DialogInputTradeComponent } from './dialog-input-trade/dialog-input-trade.component';
import { DialogImageComponent } from './dialog-image/dialog-image.component';
import { DialogSelectComponent } from './dialog-select/dialog-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers:[
    CryptoAmountHelper,
    DateTimeHelper,
    AlertMessageService
  ],
  declarations: [SpinnerComponent, DatepickerInputComponent, DialogInputComponent, DialogSelectComponent, DialogImageComponent, DialogInputTradeComponent, CounterDirective, BlockCopyPasteDirective],
  exports: [SpinnerComponent, DatepickerInputComponent, DialogInputComponent,DialogSelectComponent, DialogImageComponent, DialogInputTradeComponent, MatDatepickerModule, MatFormFieldModule, MatInputModule, CounterDirective, BlockCopyPasteDirective],
  bootstrap: [SpinnerComponent, DatepickerInputComponent, DialogInputComponent, DialogSelectComponent, DialogImageComponent, DialogInputTradeComponent ]
})
export class SharedModule {}