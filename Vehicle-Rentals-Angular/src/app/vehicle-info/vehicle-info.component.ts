// // import { Component } from '@angular/core';
// // import { ImageService } from '../image.service';
// // import { Router } from '@angular/router';
// // import { formatDate } from '@angular/common';

// // @Component({
// //   selector: 'app-vehicle-info',
// //   templateUrl: './vehicle-info.component.html',
// //   styleUrls: ['./vehicle-info.component.css']
// // })
// // export class VehicleInfoComponent {
// //   products: any[];  
// //   fromDate: string;
// //   toDate: string;
// //   numberOfDays: number;
// //   minFromDate: string;
// //   minToDate: string;
// //   errorMessage: string;

// //   constructor(private service: ImageService, private router: Router) {
// //     this.products = [];
// //     this.fromDate = '';
// //     this.toDate = '';
// //     this.numberOfDays = 0;
// //     this.errorMessage = '';
// //     const currentDate = new Date();
// //     this.minFromDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
// //     this.minToDate = this.minFromDate;
// //   }

// //   ngOnInit() {
// //     const storedItems = localStorage.getItem("singleItem");
// //     if (storedItems) {
// //       this.products = JSON.parse(storedItems);
// //     }
// //   }

// //   addToCart(product: any) {
// //     this.service.addToCart(product);
// //     this.router.navigate(['vehicleimages']);
// //   }


// //   printDates() {
// //     console.log('Start Date:', this.fromDate);
// //     console.log('End Date:', this.toDate);
// //     const startDate = new Date(this.fromDate);
// //     const endDate = new Date(this.toDate);
// //     startDate.setHours(0, 0, 0, 0);
// //     endDate.setHours(0, 0, 0, 0);
    
// //       const isWithinRange = this.products.some(item => {
// //       const availableFromDate = new Date(item.startDate);
// //       const availableToDate = new Date(item.endDate);
// //       availableFromDate.setHours(0, 0, 0, 0);
// //       availableToDate.setHours(0, 0, 0, 0);
// //       return startDate >= availableFromDate && endDate <= availableToDate;
// //     });
  
// //     if (!isWithinRange) {
// //       this.errorMessage = 'Vehicle is not available for selected dates.';
// //     } else {
// //       this.errorMessage = '';
// //       const differenceInTime = endDate.getTime() - startDate.getTime();
// //       this.numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
// //       console.log('Number of Days:', this.numberOfDays);
// //       localStorage.setItem('numberOfDays', this.numberOfDays.toString());
// //     }
// //   }
  
// // }




// import { Component, OnInit } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';
// import { DocumentService } from '../document.service';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-vehicle-info',
//   templateUrl: './vehicle-info.component.html',
//   styleUrls: ['./vehicle-info.component.css']
// })
// export class VehicleInfoComponent implements OnInit {
//   products: any[] = [];
//   fromDate: string;
//   toDate: string;
//   numberOfDays: number;
//   minFromDate: string;
//   minToDate: string;
//   errorMessage: string;

//   selectedOption: string = '';

//   selectedDriver: string = '';

//   drivingLicenseStatus: string | null = null;

//   gender: any;
//   panId: string = '';
//   customerId: any;
//   documentId: string = '';
//   message: string = '';
//   selectedFile: File | undefined;

//   maleDriverPrice :any;
//   femaleDriverPrice :any;

//   finalDays:any;

//   constructor(private service: ImageService, private router: Router, private documentService: DocumentService) {
//     this.products = [];
//     this.fromDate = '';
//     this.toDate = '';
//     this.numberOfDays = 0;
//     this.errorMessage = '';
//     const currentDate = new Date();
//     this.minFromDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
//     this.minToDate = this.minFromDate;
//     this.customerId = localStorage.getItem("userid");
//     this.gender = localStorage.getItem("gender");
//     this.fetchProducts();
//     this.femaleDriverPrice=700,
//     this.maleDriverPrice=700
//   }

//   ngOnInit() {
//     this.getStatus();
//     const storedItems = localStorage.getItem("singleItem");
//      if (storedItems) {
//       this.products = JSON.parse(storedItems);
//      }
//   }

//   onFileChanged(event: any) {
//     const inputElement = event.target as HTMLInputElement;

//     if (inputElement.files && inputElement.files.length > 0) {
//       this.selectedFile = inputElement.files[0];
//     }
//   }

//   onUpload() {
//     if (!this.selectedFile || !this.panId || !this.documentId) {
//       this.message = 'Please fill all the fields and select an image to upload.';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('panId', this.panId);
//     formData.append('documentId', this.documentId);
//     formData.append('customerId', this.customerId);

//     this.documentService.uploadImage(formData).subscribe(
//       (data: any) => {
//         if (data) {
//           this.message = 'Image uploaded successfully';
//           this.resetValues();
//           this.getStatus();
//         } else {
//           this.message = 'Image not uploaded successfully';
//         }
//       },
//       (error) => {
//         this.message = 'Error uploading image';
//       }
//     );
//   }

//   getStatus() {
//     this.documentService.getDrivingLicenseStatus(this.customerId).subscribe((data: any) => {
//       if (data && data.status) {
//         this.drivingLicenseStatus = data.status;
//       } else {
//         this.drivingLicenseStatus = 'NoRecord';
//       }
//     });
//   }

//   fetchProducts() {
//     const storedItems = localStorage.getItem("singleItem");
//     if (storedItems) {
//       this.products = JSON.parse(storedItems);
//     }
//   }

//   resetValues() {
//     this.selectedFile = undefined;
//     this.panId = '';
//     this.documentId = '';
//   }

//   addToCart(product: any) {
//     this.service.addToCart(product);
//     this.router.navigate(['vehicleimages']);
//   }


//   printDates() {
//         console.log('Start Date:', this.fromDate);
//         console.log('End Date:', this.toDate);
//         const startDate = new Date(this.fromDate);
//         const endDate = new Date(this.toDate);
//         startDate.setHours(0, 0, 0, 0);
//         endDate.setHours(0, 0, 0, 0);
        
//           const isWithinRange = this.products.some(item => {
//           const availableFromDate = new Date(item.startDate);
//           const availableToDate = new Date(item.endDate);
//           availableFromDate.setHours(0, 0, 0, 0);
//           availableToDate.setHours(0, 0, 0, 0);
//           return startDate >= availableFromDate && endDate <= availableToDate;
//         });
      
//         if (!isWithinRange) {
//           this.errorMessage = 'Vehicle is not available for selected dates.';
//         } else {
//           this.errorMessage = '';
//           const differenceInTime = endDate.getTime() - startDate.getTime();
//           this.numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
//           console.log('Number of Days:', this.numberOfDays);
//           localStorage.setItem('numberOfDays', this.numberOfDays.toString());
//         }
//       }


//       selectDriver(driver: string) {
//         console.log('Selected Driver:', driver);
//         this.selectedDriver = driver;
//         if(this.selectDriver!=null){
//         // this.finalDays = this.numberOfDays *this.maleDriverPrice;;
//         // console.log('price:', this.finalDays);
//         // localStorage.setItem('finalDays', this.finalDays.toString());
        
//         this.femaleDriverPrice = 700; // Assuming 700 is the female driver charge
//         localStorage.setItem('driverCharge', this.femaleDriverPrice.toString());
//         }

//       selectDriver(driver: string) {
//         console.log('Selected Driver:', driver);
//         this.selectedDriver = driver;
        
//         // Set the selected option based on the driver type
//         this.selectedOption = this.selectedDriver === 'Female' || this.selectedDriver === 'Male' ? 'driver-service' : 'self-driving';
      
//         console.log(this.selectedOption);
//         localStorage.setItem('selectedOption', this.selectedOption);
       
      
//         if (this.selectedOption === 'driver-service') {
//           this.femaleDriverPrice = 700; // Assuming 700 is the female driver charge
//           localStorage.setItem('driverCharge', this.femaleDriverPrice.toString());
//         }
//       }
      


//       }




// import { Component, OnInit } from '@angular/core';
// import { ImageService } from '../image.service';
// import { Router } from '@angular/router';
// import { DocumentService } from '../document.service';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-vehicle-info',
//   templateUrl: './vehicle-info.component.html',
//   styleUrls: ['./vehicle-info.component.css']
// })
// export class VehicleInfoComponent implements OnInit {
//   products: any[] = [];
//   fromDate: string;
//   toDate: string;
//   numberOfDays: number;
//   minFromDate: string;
//   minToDate: string;
//   errorMessage: string;

//   selectedOption: string = '';
//   selectedDriver: string = '';
//   drivingLicenseStatus: string | null = null;
//   gender: any;
//   panId: string = '';
//   customerId: any;
//   documentId: string = '';
//   message: string = '';
//   selectedFile: File | undefined;
//   maleDriverPrice: any;
//   femaleDriverPrice: any;
//   totalAmount: number = 0;

//   constructor(private service: ImageService, private router: Router, private documentService: DocumentService) {
//     this.products = [];
//     this.fromDate = '';
//     this.toDate = '';
//     this.numberOfDays = 0;
//     this.errorMessage = '';
//     const currentDate = new Date();
//     this.minFromDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
//     this.minToDate = this.minFromDate;
//     this.customerId = localStorage.getItem("userid");
//     this.gender = localStorage.getItem("gender");
//     this.fetchProducts();
//     this.femaleDriverPrice = 700;
//     this.maleDriverPrice = 700;
//   }

//   ngOnInit() {
//     this.getStatus();
//     const storedItems = localStorage.getItem("singleItem");
//     if (storedItems) {
//       this.products = JSON.parse(storedItems);
//     }
//   }

//   onFileChanged(event: any) {
//     const inputElement = event.target as HTMLInputElement;

//     if (inputElement.files && inputElement.files.length > 0) {
//       this.selectedFile = inputElement.files[0];
//     }
//   }

//   onUpload() {
//     if (!this.selectedFile || !this.panId || !this.documentId) {
//       this.message = 'Please fill all the fields and select an image to upload.';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('panId', this.panId);
//     formData.append('documentId', this.documentId);
//     formData.append('customerId', this.customerId);

//     this.documentService.uploadImage(formData).subscribe(
//       (data: any) => {
//         if (data) {
//           this.message = 'Image uploaded successfully';
//           this.resetValues();
//           this.getStatus();
//         } else {
//           this.message = 'Image not uploaded successfully';
//         }
//       },
//       (error) => {
//         this.message = 'Error uploading image';
//       }
//     );
//   }

//   getStatus() {
//     this.documentService.getDrivingLicenseStatus(this.customerId).subscribe((data: any) => {
//       if (data && data.status) {
//         this.drivingLicenseStatus = data.status;
//       } else {
//         this.drivingLicenseStatus = 'NoRecord';
//       }
//     });
//   }

//   fetchProducts() {
//     const storedItems = localStorage.getItem("singleItem");
//     if (storedItems) {
//       this.products = JSON.parse(storedItems);
//     }
//   }

//   resetValues() {
//     this.selectedFile = undefined;
//     this.panId = '';
//     this.documentId = '';
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
//     startDate.setHours(0, 0, 0, 0);
//     endDate.setHours(0, 0, 0, 0);

//     const isWithinRange = this.products.some(item => {
//       const availableFromDate = new Date(item.startDate);
//       const availableToDate = new Date(item.endDate);
//       availableFromDate.setHours(0, 0, 0, 0);
//       availableToDate.setHours(0, 0, 0, 0);
//       return startDate >= availableFromDate && endDate <= availableToDate;
//     });

//     if (!isWithinRange) {
//       this.errorMessage = 'Vehicle is not available for selected dates.';
//     } else {
//       this.errorMessage = '';
//       const differenceInTime = endDate.getTime() - startDate.getTime();
//       this.numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
//       console.log('Number of Days:', this.numberOfDays);
//       localStorage.setItem('numberOfDays', this.numberOfDays.toString());
//       this.calculateTotalAmount();
//     }
//   }

//   selectDriver(driver: string) {
//     console.log('Selected Driver:', driver);
//     this.selectedDriver = driver;

//     // Set the selected option based on the driver type
//     this.selectedOption = this.selectedDriver === 'Female' || this.selectedDriver === 'Male' ? 'driver-service' : 'self-driving';

//     console.log(this.selectedOption);
//     localStorage.setItem('selectedOption', this.selectedOption);

//     if (this.selectedOption === 'driver-service') {
//       // Calculate total amount considering driver charge
//       this.totalAmount = (this.calculateTotal() * this.numberOfDays) + (this.femaleDriverPrice * this.numberOfDays);
//       localStorage.setItem('driverCharge', this.femaleDriverPrice.toString());
//       localStorage.setItem('totalAmount', this.totalAmount.toString());
//       console.log("total with driver service",this.totalAmount)
//     } else {
//       // Calculate total amount without considering driver charge
//       this.totalAmount = this.calculateTotal() * this.numberOfDays;
//       localStorage.setItem('driverCharge', '0');
//       localStorage.setItem('totalAmount', this.totalAmount.toString());
//       console.log("total with driver without service",this.totalAmount)
//     }
//   }



//   calculateTotal(): number {
//     let total = 0;
//     for (const product of this.products) {
//       total += product.pricePerHour;
//     }
//     return total;
//   }
  

//   calculateTotalAmount() {
//     if (this.selectedOption === 'driver-service') {
//       // Calculate total amount considering driver charge
//       this.totalAmount = (this.calculateTotal() * this.numberOfDays) + (this.femaleDriverPrice * this.numberOfDays);
//       console.log(this.totalAmount)
//       localStorage.setItem('driverCharge', this.femaleDriverPrice.toString());
      
//     } else {
//       // Calculate total amount without considering driver charge
//       this.totalAmount = this.calculateTotal() * this.numberOfDays;
//       localStorage.setItem('driverCharge', '0');
//     }
//   }

// }




// vehicle-info.component.ts
import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  products: any[] = [];
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  minFromDate: string;
  minToDate: string;
  errorMessage: string;

  selectedOption: string = '';
  selectedDriver: string = '';
  drivingLicenseStatus: string | null = null;
  gender: any;
  panId: string = '';
  customerId: any;
  documentId: string = '';
  message: string = '';
  selectedFile: File | undefined;
  maleDriverPrice: any;
  femaleDriverPrice: any;
  totalAmount: number = 0;

  constructor(private service: ImageService, private router: Router, private documentService: DocumentService) {
    this.fromDate = '';
    this.toDate = '';
    this.numberOfDays = 0;
    this.errorMessage = '';
    const currentDate = new Date();
    this.minFromDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    this.minToDate = this.minFromDate;
    this.customerId = localStorage.getItem("userid");
    this.gender = localStorage.getItem("gender");
    this.fetchProducts();
    this.femaleDriverPrice = 700;
    this.maleDriverPrice = 700;
    this.totalAmount = 0; // Initialize totalAmount
  }

  ngOnInit() {
    this.getStatus();
    this.fetchProducts();
  }

  onFileChanged(event: any) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onUpload() {
    if (!this.selectedFile || !this.panId || !this.documentId) {
      this.message = 'Please fill all the fields and select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('panId', this.panId);
    formData.append('documentId', this.documentId);
    formData.append('customerId', this.customerId);

    this.documentService.uploadImage(formData).subscribe(
      (data: any) => {
        if (data) {
          this.message = 'Image uploaded successfully';
          this.resetValues();
          this.getStatus();
        } else {
          this.message = 'Image not uploaded successfully';
        }
      },
      (error) => {
        this.message = 'Error uploading image';
      }
    );
  }

  getStatus() {
    this.documentService.getDrivingLicenseStatus(this.customerId).subscribe((data: any) => {
      if (data && data.status) {
        this.drivingLicenseStatus = data.status;
      } else {
        this.drivingLicenseStatus = 'NoRecord';
      }
    });
  }

  fetchProducts() {
    const storedItems = localStorage.getItem("singleItem");
    if (storedItems) {
      this.products = JSON.parse(storedItems);
    }
  }

  resetValues() {
    this.selectedFile = undefined;
    this.panId = '';
    this.documentId = '';
  }

  addToCart(product: any) {
    this.service.addToCart(product);
    this.router.navigate(['vehicleimages']);
  }

  printDates() {
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
      localStorage.setItem('numberOfDays', this.numberOfDays.toString());
      this.selectDriver(''); // Re-calculate totalAmount
    }
  }

  selectDriver(driver: string) {
    this.selectedDriver = driver;
    this.selectedOption = this.selectedDriver === 'Female' || this.selectedDriver === 'Male' ? 'driver-service' : 'self-driving';

    if (this.selectedOption === 'driver-service') {
      this.totalAmount = (this.calculateTotal() * this.numberOfDays) + (this.femaleDriverPrice * this.numberOfDays);
      localStorage.setItem('driverCharge', this.femaleDriverPrice.toString());
    } else {
      this.totalAmount = this.calculateTotal() * this.numberOfDays;
      localStorage.setItem('driverCharge', '0');
    }
    localStorage.setItem('totalAmount', this.totalAmount.toString());
  }

  calculateTotal(): number {
    let total = 0;
    for (const product of this.products) {
      total += product.pricePerHour;
    }
    return total;
  }
}
