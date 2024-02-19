// import { Component } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-vehicle-info',
//   templateUrl: './vehicle-info.component.html',
//   styleUrl: './vehicle-info.component.css'
// })
// export class VehicleInfoComponent {
//   products: any[];  // Change type to array

//   constructor(private service: ImageService, private router : Router) {
//     this.products = [];
//   }

//   ngOnInit() {
//     const storedItems = localStorage.getItem("singleItem");
//     if (storedItems) {
//       this.products = JSON.parse(storedItems);
//     }
//   }

//   addToCart(product: any) {
//     // Cart using Service
//     this.service.addToCart(product);
//     this.router.navigate(['vehicleimages']);
//   }
// }



// import { Component } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-vehicle-info',
//   templateUrl: './vehicle-info.component.html',
//   styleUrls: ['./vehicle-info.component.css'] // Change 'styleUrl' to 'styleUrls'
// })
// export class VehicleInfoComponent {
//   products: any[];  
//   fromDate: string; // Declare fromDate property
//   toDate: string;   // Declare toDate property
//   totalDays :string;
//   constructor(private service: ImageService, private router: Router) {
//     this.products = [];
//     this.fromDate = ''; // Initialize fromDate
//     this.toDate = '';  // Initialize toDate
//     this.totalDays = ''; 
//   }

//   ngOnInit() {
//     const storedItems = localStorage.getItem("singleItem");
//     if (storedItems) {
//       this.products = JSON.parse(storedItems);
//     }
//   }

//   addToCart(product: any) {
//     this.service.addToCart(product);
//     this.router.navigate(['vehicleimages']);
//   }

//   printDates() {
//     console.log('Start Date:', this.fromDate);
//     console.log('End Date:', this.toDate);
//   }
 
  
// }


// import { Component } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-vehicle-info',
//   templateUrl: './vehicle-info.component.html',
//   styleUrls: ['./vehicle-info.component.css']
// })
// export class VehicleInfoComponent {
//   products: any[];  
//   fromDate: string;
//   toDate: string;
//   numberOfDays: number;
//   minFromDate: string;
//   minToDate: string;

//   constructor(private service: ImageService, private router: Router) {
//     this.products = [];
//     this.fromDate = '';
//     this.toDate = '';
//     this.numberOfDays = 0;
//     const currentDate = new Date();
//     this.minFromDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
//     this.minToDate = this.minFromDate;
//   }

//   ngOnInit() {
//     const storedItems = localStorage.getItem("singleItem");
//     if (storedItems) {
//       this.products = JSON.parse(storedItems);
//     }
//   }

//   addToCart(product: any) {
//     this.service.addToCart(product);
//     this.router.navigate(['vehicleimages']);
//   }

//   printDates() {
//     console.log('Start Date:', this.fromDate);
//     console.log('End Date:', this.toDate);
//     const startDate = new Date(this.fromDate);
//     const endDate = new Date(this.toDate);
//     const differenceInTime = endDate.getTime() - startDate.getTime();
//     this.numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
//     console.log('Number of Days:', this.numberOfDays);
//   }
// }


import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent {
  products: any[];  
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  minFromDate: string;
  minToDate: string;
  errorMessage: string;

  constructor(private service: ImageService, private router: Router) {
    this.products = [];
    this.fromDate = '';
    this.toDate = '';
    this.numberOfDays = 0;
    this.errorMessage = '';
    const currentDate = new Date();
    this.minFromDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    this.minToDate = this.minFromDate;
  }

  ngOnInit() {
    const storedItems = localStorage.getItem("singleItem");
    if (storedItems) {
      this.products = JSON.parse(storedItems);
    }
  }

  addToCart(product: any) {
    this.service.addToCart(product);
    this.router.navigate(['vehicleimages']);
  }

  printDates() {
    console.log('Start Date:', this.fromDate);
    console.log('End Date:', this.toDate);
    const startDate = new Date(this.fromDate);
    const endDate = new Date(this.toDate);
    
    // Validate if selected dates fall within the available range
    const isWithinRange = this.products.some(item => {
      const availableFromDate = new Date(item.startDate);
      const availableToDate = new Date(item.endDate);
      return startDate >= availableFromDate && endDate <= availableToDate;
    });

    if (!isWithinRange) {
      this.errorMessage = 'Vehicle is not available for selected dates.';
    } else {
      this.errorMessage = '';
      const differenceInTime = endDate.getTime() - startDate.getTime();
      this.numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      console.log('Number of Days:', this.numberOfDays);
    }
  }
}

