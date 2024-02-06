import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { headerComponent } from './header/header.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
{ path: '', component:headerComponent }, 
{ path: 'login', component: LoginComponent },
{ path: 'register', component:RegisterComponent },
{ path: 'otp', component:OtpComponent },
{ path: 'aboutus', component:AboutusComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
