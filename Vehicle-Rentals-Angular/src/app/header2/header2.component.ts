import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css',
})
export class Header2Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectToHome() {
    console.log('home');
    this.router.navigate(['']);
  }
}
