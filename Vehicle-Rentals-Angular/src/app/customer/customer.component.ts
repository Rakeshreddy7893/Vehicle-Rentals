import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  email: any;
  constructor() {
    this.email = localStorage.getItem("email");
  }
}
