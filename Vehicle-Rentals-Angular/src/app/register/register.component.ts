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
  randomNumber : number;

  constructor(private service: UserService, private toastr: ToastrService,private router :Router) {
      this.user ={
        userName:'',
        gender:'',
        country:'',
        role:'',
        phoneNumber:'',
        email:'',
        password:''
      }
      this.randomNumber = 0;
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

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  registerSubmit(formData: any, form: NgForm) {
    if (
      !formData.username ||
      !formData.mobileNumber ||
      !formData.gender ||
      !formData.country ||
      !formData.role||
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
    this.user.role = formData.role;
    this.user.phoneNumber= formData.mobileNumber;
    this.user.email = formData.emailId;
    this.user.password= formData.password;

    console.log(formData);

    this.randomNumber = this.getRandomNumber(100000, 999999);

    this.service.sendOtpToUser(this.user.phoneNumber, this.randomNumber)
    .subscribe({
      next: (flag: any) => {
        if (flag) {
          this.service.user = this.user;
          this.service.otp = this.randomNumber;
          this.router.navigate(['otp']);
        } else {
          this.toastr.error('OTP is not sent to the user');
        }
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
        this.toastr.error('Error sending OTP. Please try again.');
      }
    });


  }
 
}