declare var Razorpay: any;
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  email: any;
  products: any[] = [];
  totalAmount: number = 0;

  constructor(private service: ImageService, private router: Router) {}

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.products = this.service.getCartItems();
    const totalAmountFromStorage = localStorage.getItem('totalAmount');
    this.totalAmount = totalAmountFromStorage !== null ? +totalAmountFromStorage : 0;
  }

  goToProducts() {
    // Clear cart and navigate back to products page
    this.deleteAllProducts();
    this.service.clearCart();
    this.service.cartChanged.emit();
  }

  payNow() {
    this.paymentMail()
    const RazorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.totalAmount * 100,
      name: 'Rakesh',
      key: 'rzp_test_chEE74MxFAuQwE',
      image: 'https://cdn-icons-png.flaticon.com/512/1688/1688408.png',
      prefill: {
        name: 'Rakesh Reddy',
        email: 'rakesh@gmail.com',
        phone: '7893441076',
      },
      theme: {
        color: '#f37254',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
      },
    };
    const successCallback = (paymentid: any) => {
      console.log('success');
    };
    const failureCallback = (e: any) => {
      console.log('failure');
      console.log(e);
    };
    Razorpay.open(RazorpayOptions, successCallback, failureCallback);
    this.goToProducts();
    setTimeout(() => {this.router.navigate(['customer'])}, 10000);
  }

  paymentMail() {
    // this.service.sendMail(this.email);
    this.service.sendMail(this.email).subscribe(() => {
    });
  }

  deleteAllProducts() {
    // Clear cart items and update totalAmount
    this.service.setCartItems([]);
    this.products = [];
    this.totalAmount = 0; // Reset totalAmount
    localStorage.setItem('totalAmount', this.totalAmount.toString()); // Update totalAmount in localStorage
  }

  deleteProduct(product: any) {
    // Delete a product from the cart and update totalAmount
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.service.setCartItems(this.products);
      this.service.cartChanged.emit();
      this.totalAmount -= product.pricePerHour; // Subtract price of deleted product from totalAmount
      localStorage.setItem('totalAmount', this.totalAmount.toString()); // Update totalAmount in localStorage
    }
  }
}

