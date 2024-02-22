import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  email: any;

  ngOnInit() {}

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: UserService
  ) {
    this.email = localStorage.getItem('email');
    this.toastr.success(this.email + ' is Logout');
    localStorage.removeItem('email');
    localStorage.clear();
    service.setIsUserLoggedOut();
    this.router.navigate(['login']);
  }
}
