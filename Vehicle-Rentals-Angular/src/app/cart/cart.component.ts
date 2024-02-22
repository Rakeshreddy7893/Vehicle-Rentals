// declare var Razorpay:any;

// import { Component } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css'
// })
// export class CartComponent {
  
//   localStorageData: any;
//   email: any;
//   products: any;
//   totalAmount:any
//   days:any;
//   charge:any;
//   selectedOption: string;
 
  

//   constructor(private service: ImageService, private router: Router) {
//     this.email = localStorage.getItem('email');
//     this.products = service.getCartItems();
//     this.days = localStorage.getItem('numberOfDays');
//     console.log(this.days);
//     this.charge=localStorage.getItem('driverCharge');
//     console.log(this.charge);
//     this.selectedOption = localStorage.getItem('selectedOption')!;
//     this.totalAmount = (this.calculateTotal() * this.days) + (this.charge * this.days) ;
//     console.log('Total Amount:',this. totalAmount);
//   }

//   ngOnInit() {

    
//   }

//   goToProducts() {
//     this.deleteAllProducts();
//     this.service.clearCart(); 
//     this.service.cartChanged.emit(); 
   
//   }

//   payNow(){
  
   
//     const RazorpayOptions = {
//       description :'Sample Rozorpay demo',
//       currency :'INR',
//       amount : this.totalAmount * 100 , 
//       name : 'Rakesh',
//       key : 'rzp_test_chEE74MxFAuQwE',
//       image:'https://cdn-icons-png.flaticon.com/512/1688/1688408.png',
//       prefill :{
//         name:'Rakesh Reddy',
//         email:'rakesh@gmail.com',
//         phone :'7893441076'
//       },
//       theme:{
//         color:'#f37254'
//       },
//       modal :{
//         ondismiss :()=>{
//           console.log('dismissed');
//         }
//       }

//     }
//     const successCallback=(paymentid :any)=>{
//       console.log("sucess");
//     }
//     const failureCallback=(e:any)=>{
//       console.log("failure");
//       console.log(e);
//     }
//     Razorpay.open(RazorpayOptions,successCallback,failureCallback);
//     this.goToProducts();
//     // setTimeout(() => {
//     //   this.router.navigate(['statuspage']);
//     // }, 5000);
    
//   }
  

//   calculateTotal(): number {
//     let total = 0;
//     for (const product of this.products) {
//       total += product.pricePerHour;
      
//     }
//     return total;
//   }

//   deleteAllProducts() {
//     this.service.setCartItems([]); 
   
//   }

//   deleteProduct(product: any) {
//     const index = this.products.indexOf(product);
//     if (index !== -1) {
//       this.products.splice(index, 1);
//       this.service.setCartItems(this.products); 
//       this.service.cartChanged.emit(); 
      
//     }
//   }
  
// }




// declare var Razorpay:any;
// import { Component } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent {
//   email: any;
//   products: any;
//   totalAmount: any;

//   constructor(private service: ImageService, private router: Router) {
//     this.email = localStorage.getItem('email');
//     this.products = service.getCartItems();
//     this.totalAmount = localStorage.getItem('totalAmount');
//   }

//   goToProducts() {
//     this.deleteAllProducts();
//     this.service.clearCart();
//     this.service.cartChanged.emit();
//   }

//   payNow() {
//     const RazorpayOptions = {
//       description: 'Sample Razorpay demo',
//       currency: 'INR',
//       amount: this.totalAmount * 100,
//       name: 'Rakesh',
//       key: 'rzp_test_chEE74MxFAuQwE',
//       image: 'https://cdn-icons-png.flaticon.com/512/1688/1688408.png',
//       prefill: {
//         name: 'Rakesh Reddy',
//         email: 'rakesh@gmail.com',
//         phone: '7893441076'
//       },
//       theme: {
//         color: '#f37254'
//       },
//       modal: {
//         ondismiss: () => {
//           console.log('dismissed');
//         }
//       }
//     };
//     const successCallback = (paymentid: any) => {
//       console.log("success");
//     };
//     const failureCallback = (e: any) => {
//       console.log("failure");
//       console.log(e);
//     };
//     Razorpay.open(RazorpayOptions, successCallback, failureCallback);
//     this.goToProducts();
//   }

//   deleteAllProducts() {
//     this.service.setCartItems([]);
//   }

//   deleteProduct(product: any) {
//     const index = this.products.indexOf(product);
//     if (index !== -1) {
//       this.products.splice(index, 1);
//       this.service.setCartItems(this.products);
//       this.service.cartChanged.emit();
//     }
//   }
// }


declare var Razorpay:any;
import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  email: any;
  products: any;
  totalAmount: any;

  constructor(private service: ImageService, private router: Router) {
    this.email = localStorage.getItem('email');
    this.products = service.getCartItems();
    this.totalAmount = localStorage.getItem('totalAmount');
  }

  goToProducts() {
    this.deleteAllProducts();
    this.service.clearCart();
    this.service.cartChanged.emit();
  }

  payNow() {
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
        phone: '7893441076'
      },
      theme: {
        color: '#f37254'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    };
    const successCallback = (paymentid: any) => {
      console.log("success");
    };
    const failureCallback = (e: any) => {
      console.log("failure");
      console.log(e);
    };
    Razorpay.open(RazorpayOptions, successCallback, failureCallback);
    this.goToProducts();
  }

  deleteAllProducts() {
    this.service.setCartItems([]);
  }

  deleteProduct(product: any) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.service.setCartItems(this.products);
      this.service.cartChanged.emit();
    }
  }
}


