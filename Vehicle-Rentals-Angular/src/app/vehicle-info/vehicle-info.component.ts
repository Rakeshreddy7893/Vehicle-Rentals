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
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
      const isWithinRange = this.products.some(item => {
      const availableFromDate = new Date(item.startDate);
      const availableToDate = new Date(item.endDate);
      availableFromDate.setHours(0, 0, 0, 0);
      availableToDate.setHours(0, 0, 0, 0);
      return startDate >= availableFromDate && endDate <= availableToDate;
    });
  
    if (!isWithinRange) {
      this.errorMessage = 'Vehicle is not available for selected dates.';
    } else {
      this.errorMessage = '';
      const differenceInTime = endDate.getTime() - startDate.getTime();
      this.numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      console.log('Number of Days:', this.numberOfDays);
      localStorage.setItem('numberOfDays', this.numberOfDays.toString());
    }
  }
  
}

