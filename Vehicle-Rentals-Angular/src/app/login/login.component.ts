import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: NgForm;
  showPassword: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {
    this.loginForm = {} as NgForm; 
  }

  loginSubmit(formData: any, form: NgForm): void {
    if (!formData.email || !formData.password) {
      this.toastr.error('Both email and password are required');
    } else {
      console.log(formData.email);
      console.log(formData.password);
      this.toastr.success("Success");
    }
  }
  
  registerRedirect() {
    this.toastr.info('Redirecting to registration page'); 
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
