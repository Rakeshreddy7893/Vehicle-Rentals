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
  constructor(private service: ImageService, private router:Router,private location :Location) {
    this.cartItems = service.getCartItems();
  }

  ngOnInit() {
    this.service.cartChanged.subscribe(() => {
      this.cartItems = this.service.getCartItems();
    });
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
