import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header4',
  templateUrl: './header4.component.html',
  styleUrl: './header4.component.css',
})
export class Header4Component implements OnInit {
  constructor(private router: Router, private location: Location) {}
  ngOnInit(): void {}

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectBack(): void {
    this.location.back();
  }
}
