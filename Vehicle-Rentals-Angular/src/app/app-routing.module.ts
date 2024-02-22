import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { headerComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { CustomerComponent } from './customer/customer.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { MystackComponent } from './mystack/mystack.component';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { CartComponent } from './cart/cart.component';
import { VehicleimagesComponent } from './vehicleimages/vehicleimages.component';
import { StatuspageComponent } from './statuspage/statuspage.component';
import { ImageComponent } from './image/image.component';

const routes: Routes = [
{ path: '',                                      component:headerComponent }, 
{ path: 'login',                                 component: LoginComponent },
{ path: 'register',                              component:RegisterComponent },
{path:'header',                                  component:headerComponent},
{path:'header/login',                            component:LoginComponent},
{path:'header/register',                         component:RegisterComponent},
{ path: 'logout',     canActivate:[authGuard],   component:LogoutComponent },
{ path: 'otp',        canActivate:[authGuard],   component:OtpComponent },
{path:'contact',      canActivate:[authGuard],   component:ContactComponent},
{path:'admin',        canActivate:[authGuard],   component:AdminComponent},
{path:'owner',        canActivate:[authGuard],   component:OwnerComponent},
{path:'customer',                                component:CustomerComponent},
{ path: 'owner/logout',  canActivate: [authGuard],component: LogoutComponent },
{ path: 'owner/contact', canActivate:[authGuard],component: ContactComponent },
{path:'mystack',         canActivate:[authGuard],   component:MystackComponent},
{path:'vehicleimages',   canActivate:[authGuard],   component:VehicleimagesComponent},
{path:'vehicle-info',    canActivate:[authGuard],   component:VehicleInfoComponent},
{path:'cart',            canActivate:[authGuard],   component:CartComponent},
{path:'statuspage',      canActivate:[authGuard],component:StatuspageComponent},
{path:'image',           canActivate:[authGuard],component:ImageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
