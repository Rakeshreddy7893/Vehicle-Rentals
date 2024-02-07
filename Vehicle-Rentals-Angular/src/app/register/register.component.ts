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
  user:any;

  constructor(private service: UserService, private toastr: ToastrService,private router :Router) {
      this.user ={
        userName:'',
        gender:'',
        country:'',
        phoneNumber:'',
        email:'',
        password:'',
        confirmPassword:'',

      }

  }

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
    this.user.userName = formData.username;
    this.user.gender = formData.gender;
    this.user.country = formData.country;
    this.user.phoneNumber= formData.mobileNumber;
    this.user.email = formData.emailId;
    this.user.password= formData.password;
    this.user.confirmPassword = formData.confirmPassword;

    console.log(formData);
    this.service.registerUser(this.user).subscribe((data:any)=>{console.log(data)});
    this.router.navigate(['otp']);
  }
 
}
