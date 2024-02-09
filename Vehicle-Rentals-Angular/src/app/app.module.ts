import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import {  headerComponent } from './header/header.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { ServiceComponent } from './service/service.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OtpComponent,
    headerComponent,
    AboutusComponent,
    ContactComponent,
    MainComponent,
    ServiceComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxCaptchaModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
