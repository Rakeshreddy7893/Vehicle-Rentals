import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: NgForm;
  showPassword: boolean = false;
  protected aFormGroup: FormGroup;

  user : any;

  constructor(private router: Router, private toastr: ToastrService, private service : UserService, private formBuilder: FormBuilder) {
    this.loginForm = {} as NgForm;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
}
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    
  }

  siteKey:string = "6Lfel20pAAAAAAOAa-byclJub9pLkMaXtbXdaZUP";

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
