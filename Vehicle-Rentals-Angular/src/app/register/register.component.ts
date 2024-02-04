// TypeScript File
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  countries: any;
  formError: string = '';

  constructor(private service: UserService, private toastr: ToastrService,private router :Router) {}

  ngOnInit() {
    this.service.getAllCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  showPassword: boolean = false;

  focusPasswordField(passwordField: any) {
    passwordField.focus();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  registerSubmit(formData: any, form: NgForm) {
    if (
      !formData.username ||
      !formData.mobileNumber ||
      !formData.gender ||
      !formData.country ||
      !formData.emailId ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      this.formError = 'All fields are required';
      this.toastr.error('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      this.formError = 'Passwords do not match';
      form.controls['confirmPassword'].setErrors({ passwordMismatch: true });
      return;
    }

    this.formError = '';

    // Display Toastr message
    this.toastr.success('Registration successful');

    // Print data in the console
    console.log(formData);

   
  }
  loginRedirect(){
    this.toastr.info('Redirecting to login page'); 
    this.router.navigate(['/login']);
  }
}
