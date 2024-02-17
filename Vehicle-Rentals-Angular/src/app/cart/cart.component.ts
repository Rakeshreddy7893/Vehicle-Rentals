import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  localStorageData: any;
  email: any;
  products: any;

  constructor(private service: ImageService, private router: Router) {
    this.email = localStorage.getItem('email');
    this.products = service.getCartItems();
  }

  ngOnInit() {
  }

  goToProducts() {
    this.deleteAllProducts();
    this.service.clearCart(); // Clear the cart in the service
    this.service.cartChanged.emit(); // Emit the event to update the header
    this.router.navigate(['vehicleimages']);
  }

  calculateTotal(): number {
    let total = 0;
    for (const product of this.products) {
      total += product.pricePerHour;
    }
    return total;
  }

  deleteAllProducts() {
    this.service.setCartItems([]); // Set the cart items to an empty array
  }

  deleteProduct(product: any) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.service.setCartItems(this.products); // Update the cart items in the service
      this.service.cartChanged.emit(); // Emit the event to update the header
    }
  }
}
