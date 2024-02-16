// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: NgForm;
//   showPassword: boolean = false;
//   protected aFormGroup: FormGroup;
//   siteKey:string = "6Lfel20pAAAAAAOAa-byclJub9pLkMaXtbXdaZUP";
//   user : any;

//   constructor(private router: Router, private toastr: ToastrService, private service : UserService, private formBuilder: FormBuilder) {
//     this.loginForm = {} as NgForm;
//     this.aFormGroup = this.formBuilder.group({
//       recaptcha: ['', Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.aFormGroup = this.formBuilder.group({
//       recaptcha: ['', Validators.required]
//     });
//   }

//   async loginSubmit(formData: any, form: NgForm) {
//     if (!this.aFormGroup.controls['recaptcha'].valid) {
//       // If captcha is not validated, show error message
//       this.toastr.error('Please complete the captcha');
//       return;
//     }

//     if (!formData.email || !formData.password) {
//       this.toastr.error('Both email and password are required');
//       return;
//     }

//     console.log(formData.email);
//     console.log(formData.password);

//     await this.service.userLogin(formData.email, formData.password).then((data: any) => {
//       console.log(data);
//       this.user = data;
//       if(this.user == null){
//         this.toastr.error("Invalid User Details ?");
//       }
//       localStorage.setItem("userid",data.userId);
//       localStorage.setItem("email",data.email);
//     });


//     if(this.user != null && this.user.role === formData.role && this.user.role === 'admin'){
//       this.service.setIsUserLoggedIn();
//       this.toastr.success("Admin login is Success!!");
//       this.router.navigate(['admin']);
//     } else if(this.user != null && this.user.role === formData.role && this.user.role === 'customer'){
//       this.service.setIsUserLoggedIn();
//       this.toastr.success("Customer login is Success!!");
//       this.router.navigate(['customer']);
//     } else if(this.user != null && this.user.role === formData.role && this.user.role === 'owner'){
//       this.service.setIsUserLoggedIn();
//       this.toastr.success("Owner login is success !!");
//       this.router.navigate(['owner']);
//     } else {
//       console.log("else")
//       this.toastr.error("Invalid Login credentials");
//     }
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }
// }



declare var google:any;
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
  siteKey:string = "6Lfel20pAAAAAAOAa-byclJub9pLkMaXtbXdaZUP";
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

    google.accounts.id.initialize({
    client_id:'346149961852-984ul77d846ugr6cs6p7q7q3nu112p1p.apps.googleusercontent.com',
    callback: (resp :any)=>this.handleLogin(resp)
      
    

    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
    theme :'filled_blue',
    size : 'large',
    shape:'rectangle',
    width:350,
    })
  }

  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }

 handleLogin(response :any){
  console.log("working");
  if(response){
    const payLoad = this.decodeToken(response.credential)
    sessionStorage.setItem("loggedInUser",JSON.stringify(payLoad));
    this.router.navigate(['customer']);
  }

 }




  async loginSubmit(formData: any, form: NgForm) {
    if (!this.aFormGroup.controls['recaptcha'].valid) {
      // If captcha is not validated, show error message
      this.toastr.error('Please complete the captcha');
      return;
    }

    if (!formData.email || !formData.password) {
      this.toastr.error('Both email and password are required');
      return;
    }

    console.log(formData.email);
    console.log(formData.password);

    await this.service.userLogin(formData.email, formData.password).then((data: any) => {
      console.log(data);
      this.user = data;
      if(this.user == null){
        this.toastr.error("Invalid User Details ?");
      }
      localStorage.setItem("userid",data.userId);
      localStorage.setItem("email",data.email);
    });


    if(this.user != null && this.user.role === formData.role && this.user.role === 'admin'){
      this.service.setIsUserLoggedIn();
      this.toastr.success("Admin login is Success!!");
      this.router.navigate(['admin']);
    } else if(this.user != null && this.user.role === formData.role && this.user.role === 'customer'){
      this.service.setIsUserLoggedIn();
      this.toastr.success("Customer login is Success!!");
      this.router.navigate(['customer']);
    } else if(this.user != null && this.user.role === formData.role && this.user.role === 'owner'){
      this.service.setIsUserLoggedIn();
      this.toastr.success("Owner login is success !!");
      this.router.navigate(['owner']);
    } else {
      console.log("else")
      this.toastr.error("Invalid Login credentials");
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}


