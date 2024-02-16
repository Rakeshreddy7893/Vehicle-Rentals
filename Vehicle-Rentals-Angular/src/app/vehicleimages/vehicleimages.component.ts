import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-vehicleimages',
  templateUrl: './vehicleimages.component.html',
  styleUrls: ['./vehicleimages.component.css']
})
export class VehicleimagesComponent implements OnInit {

  selectedFile: File | undefined;
  retrievedImage: any;
  message: string = '';
  imageName: string = '';
  category: string = '';
  categoryFilter: string = '';

  flag : boolean = false;
  btnData : string = 'table';

  allImages: any[] = [];

  constructor(private imageService: ImageService) { 

  }

  ngOnInit() {
    this.getAllImages();
  }


  getAllImages() {
    this.imageService.getAllImages().subscribe(
      (res: any[]) => {
        console.log(res);
        this.allImages = res;
        this.allImages.forEach((image) => {
          image.picByte = 'data:image/jpeg;base64,' + image.picByte;
        });
      },
      (error) => {
        console.error('Error retrieving all images:', error);
      }
    );
  }

  getImagesByCategory() {
    if (!this.categoryFilter) {
      this.message = 'Please enter a category for filtering.';
      return;
    }

    this.imageService.getImagesByCategory(this.categoryFilter).subscribe(
      (res: any[]) => {
        console.log(res);
        this.allImages = res;
        this.allImages.forEach((image) => {
          image.picByte = 'data:image/jpeg;base64,' + image.picByte;
        });
      },
      (error) => {
        console.error('Error retrieving images by category:', error);
        this.resetValues();
      }
    );
  }

  private resetValues() {
    this.selectedFile = undefined;
    this.imageName = '';
    this.category = '';
    this.categoryFilter = '';
  }

  toggle() : void {
    if(this.flag == false){
      this.flag = (!this.flag);
      this.btnData = 'cards';
    } else {
      this.flag = (!this.flag);
      this.btnData = 'table';
    }
  }

  
}
