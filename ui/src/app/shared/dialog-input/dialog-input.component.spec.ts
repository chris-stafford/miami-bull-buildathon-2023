import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatNativeDateModule} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatMenuModule} from '@angular/material/menu';
import { MatOptionModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { CryptoAmountHelper } from '../cryptoAmount.helper';
import { DateTimeHelper } from '../dateTime.helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogInputComponent } from './dialog-input.component';

describe('DialogInputComponent', () => {
  let component: DialogInputComponent;
  let fixture: ComponentFixture<DialogInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInputComponent ],
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
        MatDialogModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      providers:[
        CryptoAmountHelper,
        DateTimeHelper,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
