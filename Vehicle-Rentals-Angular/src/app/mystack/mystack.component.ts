import { Component } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-mystack',
  templateUrl: './mystack.component.html',
  styleUrl: './mystack.component.css'
})
export class MystackComponent {
  
  selectedFile: File | undefined;
  retrievedImage: any;
  message: string = '';
  imageName: string = '';
  category: string = '';
  categoryFilter: string = '';

  allImages: any[] = [];

  ownerId: any;

  constructor(private imageService : ImageService) { 
    this.ownerId = localStorage.getItem("userid");
  }

  ngOnInit() {
    this.getAllMyVehicles();
  }


  getAllMyVehicles() {
    this.imageService.getMyStack(this.ownerId).subscribe(
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


  private resetValues() {
    this.selectedFile = undefined;
    this.imageName = '';
    this.category = '';
    this.categoryFilter = '';
  }

}
