import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private toastr: ToastrService,private router :Router) { } 

  ngOnInit() {
  }

  submitOTP(formData: any, form: NgForm) { 
    
    if (!formData.otp) { 
      this.toastr.error('OTP is required.'); 
      return;
    }
    
    console.log(formData);
    this.toastr.success('Registration successful');
    this.router.navigate(['login']) 
  }
}
