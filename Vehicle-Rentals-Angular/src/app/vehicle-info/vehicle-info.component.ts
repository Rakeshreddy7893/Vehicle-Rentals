import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.css'
})
export class VehicleInfoComponent {
  products: any[];  // Change type to array

  constructor(private service: ImageService, private router : Router) {
    this.products = [];
  }

  ngOnInit() {
    const storedItems = localStorage.getItem("singleItem");
    if (storedItems) {
      this.products = JSON.parse(storedItems);
    }
  }

  addToCart(product: any) {
    // Cart using Service
    this.service.addToCart(product);
    this.router.navigate(['vehicleimages']);
  }
}
