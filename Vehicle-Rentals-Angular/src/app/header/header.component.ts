
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent implements OnInit {
  loginStatus: any;

  constructor(private service: UserService) {
  }

ngOnInit() {
    this.service.getLoginStatus().subscribe((data: any) => {
      this.loginStatus = data;
    });
  }
  
}
