import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';

declare var jQuery: any;

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css'],
})
export class AllusersComponent implements OnInit {
  imageId: string = '';
  imageName: string = '';
  imageColour: string = '';
  imageSeats: string = '';
  imageModel: string = '';
  imageCategory: string = '';
  imagePricePerHour: number = 0;
  selectedFile: File | undefined;

  ownerId: any;

  users: any;
  countries: any;
  email: any;
  singleUser: any;

  allImages: any[] = [];
  allNotApprovedImages: any[] = [];
  presentStatus: any;

  allDocumentsApprovedImages: any[] = [];
  allDocumentsNotApprovedImages: any[] = [];
  presentDocumentStatus: any;

  showApproved: boolean = false;
  showUnapproved: boolean = false;

  constructor(
    private router: Router,
    private service: UserService,
    private toastr: ToastrService,
    private imageService: ImageService,
    private documentService: DocumentService
  ) {
    this.email = localStorage.getItem('email');
    this.ownerId = localStorage.getItem('userid');

    this.singleUser = {
      userId: 0,
      userName: '',
      gender: '',
      country: '',
      role: '',
      phoneNumber: '',
      email: '',
      password: '',
    };
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
    this.service.getAllCountries().subscribe((data: any) => {
      this.countries = data;
    });
    this.getAllImages();
    this.getAllNotApprovImages();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateSingleImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('id', this.imageId);
    formData.append('name', this.imageName);
    formData.append('colour', this.imageColour);
    formData.append('seats', this.imageSeats);
    formData.append('model', this.imageModel);
    formData.append('category', this.imageCategory);
    formData.append('pricePerHour', this.imagePricePerHour.toString());

    this.imageService.updateSingleImage(formData).subscribe(
      () => {
        this.toastr.success('Image updated successfully !');
        this.getAllImages();
      },
      (error) => {
        this.toastr.error('Image not updated successfully ?');
      }
    );
  }

  editImage(image: any) {
    this.imageId = image.id;
    this.imageName = image.name;
    this.imageColour = image.colour;
    this.imageSeats = image.seats;
    this.imageModel = image.model;
    this.imageCategory = image.category;
    this.imagePricePerHour = image.pricePerHour;
    this.selectedFile = image.picByte;
    console.log(image);
    jQuery('#imageModal').modal('show');
  }

  deleteImage(imageId: any) {
    this.toastr.success('Image Deleted Successfully!!!');
    const encodedImageId = encodeURIComponent(imageId);
    this.imageService.deleteImage(encodedImageId).subscribe(
      (flag) => {
        if (flag) {
          for (let i = 0; i < this.allImages.length; i++) {
            if (this.allImages[i].id === imageId) {
              this.allImages.splice(i, 1);
              break;
            }
          }
        } else {
          console.error('Unknown response error  false');
          this.toastr.error('Failed to delete image');
        }
      },
      (error) => {
        console.error('Error deleting image: not reached sb');
        this.toastr.error('Failed to delete image');
      }
    );
    this.getAllImages();
  }

  toggleStatus(image: any) {
    this.presentStatus = image.status;
    const newStatus =
      this.presentStatus === 'Approved' ? 'Not Approved' : 'Approved';
    this.imageService.updateImage(newStatus, image.id).subscribe(() => {
      this.getAllImages();
      this.getAllNotApprovImages();
    });
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

  getAllNotApprovImages() {
    this.imageService.getAllNotApprovedImages().subscribe(
      (res: any[]) => {
        console.log(res);
        this.allNotApprovedImages = res;
        this.allNotApprovedImages.forEach((image) => {
          image.picByte = 'data:image/jpeg;base64,' + image.picByte;
        });
      },
      (error) => {
        console.error('Error retrieving not approved images:', error);
      }
    );
  }

  getAllApprovedImages() {
    this.documentService.getAllApprovedDocImages().subscribe(
      (res: any[]) => {
        console.log(res);
        this.allDocumentsApprovedImages = res;
        this.allDocumentsApprovedImages.forEach((image) => {
          image.documentContent =
            'data:image/jpeg;base64,' + image.documentContent;
        });
      },
      (error) => {
        console.error('Error retrieving not approved images:', error);
      }
    );
  }

  showApprovedImages() {
    this.showApproved = true;
    this.showUnapproved = false;
    this.getAllApprovedImages();
  }

  showUnapprovedImages() {
    this.showUnapproved = true;
    this.showApproved = false;
    this.getAllNotApprovedImages();
  }

  getAllNotApprovedImages() {
    this.documentService.getAllNotApprovedDocImages().subscribe(
      (res: any[]) => {
        console.log(res);
        this.allDocumentsNotApprovedImages = res;
        this.allDocumentsNotApprovedImages.forEach((image) => {
          image.documentContent =
            'data:image/jpeg;base64,' + image.documentContent;
        });
      },
      (error) => {
        console.error('Error retrieving not approved images:', error);
      }
    );
  }

  toggleDocumentStatus(image: any) {
    this.presentDocumentStatus = image.status;
    const newStatus =
      this.presentDocumentStatus === 'Approved' ? 'Not Approved' : 'Approved';
    this.documentService
      .updateDocumentImageStatus(newStatus, image.documentId)
      .subscribe(() => {
        this.getAllApprovedImages();
        this.getAllNotApprovedImages();
      });
  }

  editUser(user: any) {
    console.log(user);
    this.singleUser = user;
    jQuery('#myModal').modal('show');
  }

  updateUser() {
    console.log(this.singleUser);
    this.service.updateUser(this.singleUser).subscribe((data: any) => {
      console.log(data);
    });
  }

  deleteUser(user: any) {
    this.service.deleteUser(user.userId).subscribe((data: any) => {
      console.log(data);
    });

    const i = this.users.findIndex((element: any) => {
      return element.userId == user.userId;
    });

    this.users.splice(i, 1);

    this.toastr.success('User Deleted Successfully!!!');
  }
}
