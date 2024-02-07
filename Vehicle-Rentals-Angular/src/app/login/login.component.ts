import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: NgForm;
  showPassword: boolean = false;

  user : any;

  constructor(private router: Router, private toastr: ToastrService, private service : UserService) {
    this.loginForm = {} as NgForm; 
  }

 async loginSubmit(formData: any, form: NgForm) {
    if (!formData.email || !formData.password) {
      this.toastr.error('Both email and password are required');
    } else {
      console.log(formData.email);
      console.log(formData.password);

      await this.service.userLogin(formData.email, formData.password).then((data: any) => {
        console.log(data);
        this.user = data;
      });

      if(this.user != null){
        this.toastr.success("Success");
        this.router.navigate(['main']);
      } else {
         this.toastr.error("Invalid Login credentials");
      }

    }
  }
  
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
