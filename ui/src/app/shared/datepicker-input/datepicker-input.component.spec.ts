import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatepickerInputComponent } from './datepicker-input.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DatepickerInputComponent', () => {
  let component: DatepickerInputComponent;
  let fixture: ComponentFixture<DatepickerInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerInputComponent ],
      imports: [
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
