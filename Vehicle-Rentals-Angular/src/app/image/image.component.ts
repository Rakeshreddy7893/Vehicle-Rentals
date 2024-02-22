import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  imageId: string = '';
  imageName: string = '';
  imageColour: string = '';
  imageSeats: string = '';
  imageModel: string = '';
  imageCategory: string = '';
  imageStartDate: any = new Date();
  imageEndDate: any = new Date();
  imagePricePerHour: number = 0;
  selectedFile: File | undefined;
  minDate: string;

  ownerId: any;

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.ownerId = localStorage.getItem('userid');

    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${today.getFullYear()}-${month}-${day}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onImageUpload() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.imageStartDate = new Date(this.imageStartDate);
    this.imageEndDate = new Date(this.imageEndDate);

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('id', this.imageId);
    formData.append('name', this.imageName);
    formData.append('colour', this.imageColour);
    formData.append('seats', this.imageSeats);
    formData.append('model', this.imageModel);
    formData.append('category', this.imageCategory);
    formData.append('startDate', this.imageStartDate.toISOString());
    formData.append('endDate', this.imageEndDate.toISOString());
    formData.append('pricePerHour', this.imagePricePerHour.toString());
    formData.append('ownerId', this.ownerId);

    this.imageService.uploadImage(formData).subscribe(
      (data: any) => {
        console.log('Image uploaded successfully');
        this.toastr.success('Image uploaded successfully !');
        this.router.navigate(['mystack']);
        console.log(data);
      },
      (error) => {
        this.toastr.error('Image not inserted successfully ?');
      }
    );
  }
}
