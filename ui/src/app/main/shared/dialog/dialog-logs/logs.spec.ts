import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
import { APP_CONFIG, DEFAULT_APP_CONFIG } from 'src/app/config/app.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogLogsComponent } from './dialog-logs.component';
import { ClusterRoutingModule } from 'src/app/main/cluster-routing.module';

describe('DialogLogsComponent', () => {
  let component: DialogLogsComponent;
  let fixture: ComponentFixture<DialogLogsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
            DialogLogsComponent,
        ],
      imports: [
        CoreModule,
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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClusterRoutingModule,
        MatTreeModule,
        MatSlideToggleModule,
        SharedModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot()
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: DEFAULT_APP_CONFIG
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(DialogLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
