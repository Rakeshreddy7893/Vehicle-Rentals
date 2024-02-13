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
import { ServiceComponent } from './service/service.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { CustomerComponent } from './customer/customer.component';
import { ImageComponent } from './image/image.component';
import { VehicleimagesComponent } from './vehicleimages/vehicleimages.component';
import { Header1Component } from './header1/header1.component';

import { MystackComponent } from './mystack/mystack.component';
import { AllusersComponent } from './allusers/allusers.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OtpComponent,
    headerComponent,
    AboutusComponent,
    ContactComponent,
    ServiceComponent,
    AdminComponent,
    OwnerComponent,
    CustomerComponent,
    ImageComponent,
    VehicleimagesComponent,
    Header1Component,   
    MystackComponent,
    AllusersComponent,
    MystackComponent, FooterComponent,
   
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
