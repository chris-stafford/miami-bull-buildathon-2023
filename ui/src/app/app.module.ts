import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from './core/core.module';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { APP_CONFIG, DEFAULT_APP_CONFIG } from './config/app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from "@angular/common/http";
import { AlertMessageService } from './shared/alertMessage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { Web3Service } from './shared/web3.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthenticationService,
    {
      provide: APP_CONFIG,
      useValue: DEFAULT_APP_CONFIG
    },
    Web3Service,
    NgxSpinnerService,
    AlertMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
