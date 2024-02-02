import { ToastrService } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  countries: any;
  formError: string = '';
 

  constructor(private service: UserService, private toastr: ToastrService) {}

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

      this.toastr.error('All fields are required', 'Error', { timeOut: 5000 });

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      this.formError = 'Passwords do not match';
      form.controls['confirmPassword'].setErrors({ passwordMismatch: true });

      

      return;
    }

    this.formError = '';

    console.log(formData);

    this.toastr.success('Registration successful', 'Success', {
      timeOut: 5000,
    });
  }

 
  
}
