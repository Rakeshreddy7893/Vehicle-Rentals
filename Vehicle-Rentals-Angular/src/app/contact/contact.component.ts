import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private service : UserService, private router : Router, private toastr : ToastrService){
  }

  feedbackSubmit(formData: any, form: NgForm) {
    this.service.sendMail(formData.email, formData.query).subscribe();
    this.toastr.success("Mail is sent successfully !");
  }
}
