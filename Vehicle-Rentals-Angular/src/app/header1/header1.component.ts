import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { ImageService } from '../image.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrl: './header1.component.css'
})
export class Header1Component implements OnInit {
  cartItems: any;
  // loginStatus : any;
  constructor(private service: ImageService, private router:Router,private location :Location) {
    this.cartItems = service.getCartItems();
  }

  ngOnInit() {
    // Listen for the cartChanged event
    this.service.cartChanged.subscribe(() => {
      this.cartItems = this.service.getCartItems();
    });


    // this.service.getLoginStatus().subscribe((data: any) => {
    //   this.loginStatus = data;
    // });
  }

  redirectToCart(){
    this.router.navigate(['cart'])
  }

  redirectToLogin(){
    this.router.navigate(['login'])
  }

  redirectToContact(){
    this.router.navigate(['contact']);
  }

  redirectBack(): void {
    this.location.back();
  }

}
