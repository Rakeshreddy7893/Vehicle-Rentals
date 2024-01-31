import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerSubmit(regForm: any) {
    console.log(regForm);
  }

    
    //if (formData.password !== formData.confirmPassword) {
     // console.log('Password and Confirm Password do not match.');
      //return;
    //}

   
  
}
