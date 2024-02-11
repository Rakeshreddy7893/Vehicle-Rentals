import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  emailId : any;

  ngOnInit(){
    
  }
  constructor(private router :Router,private toastr : ToastrService,private service : UserService){
  service.setIsUserLoggedOut();
  this.router.navigate(['login']);


  }
  

}
