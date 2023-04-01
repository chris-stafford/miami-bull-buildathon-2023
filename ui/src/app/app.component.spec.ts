import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatNativeDateModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatSortModule} from '@angular/material/sort';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatRadioModule} from '@angular/material/radio';
import { MatOptionModule} from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from 'src/app/config/app.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        FontAwesomeModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatOptionModule,
        MatSelectModule,
        MatExpansionModule,
        MatRadioModule,
        MatNativeDateModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(),
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AuthenticationService,
        {
          provide: APP_CONFIG,
          useValue: DEFAULT_APP_CONFIG
        }
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MiamiBull'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MiamiBull');
  });
});
