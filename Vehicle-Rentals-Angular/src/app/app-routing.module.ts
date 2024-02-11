import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { headerComponent } from './header/header.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { CustomerComponent } from './customer/customer.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
{ path: '',           component:headerComponent }, 
{ path: 'login',      component: LoginComponent },
{ path: 'register',   component:RegisterComponent },
{path:'service',      component:ServiceComponent},
{ path: 'aboutus',    component:AboutusComponent },
{ path: 'otp',        canActivate:[authGuard],   component:OtpComponent },
{path:'contact',      canActivate:[authGuard],   component:ContactComponent},
{path:'admin',        canActivate:[authGuard],   component:AdminComponent},
{path:'owner',        canActivate:[authGuard],   component:OwnerComponent},
{path:'customer',     canActivate:[authGuard],   component:CustomerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
