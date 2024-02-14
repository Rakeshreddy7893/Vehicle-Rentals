import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../image.service';

declare var jQuery: any;

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users: any;
  countries: any;
  email: any;
  singleUser : any;

  allImages: any[] = [];

  allNotApprovedImages: any[] = [];

  presentStatus: any;

  constructor(private service: UserService, private toastr: ToastrService,private imageService: ImageService) {
    this.email = localStorage.getItem("email");

    this.singleUser = {
      userId: 0,
      userName: '',
      gender: '',
      country: '',
      role: '',
      phoneNumber: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.service.getAllUsers().subscribe((data: any) => { this.users = data; });
    this.service.getAllCountries().subscribe((data: any) => { this.countries = data; });
    this.getAllImages();
    this.getAllNotApprovImages();
  }


  toggleStatus(image : any){
    this.presentStatus = image.status;
    if(this.presentStatus === 'Approved'){
        this.imageService.updateImage('Not Approved', image.id).subscribe(() => {
            // Refresh data after status update
            this.getAllImages();
            this.getAllNotApprovImages();
        });
    } else {
        this.imageService.updateImage('Approved', image.id).subscribe(() => {
            // Refresh data after status update
            this.getAllImages();
            this.getAllNotApprovImages();
        });
    }
}


  // toggleStatus(image : any){
  //   this.presentStatus = image.status;
  //   if(this.presentStatus === 'Approved'){
  //     this.imageService.updateImage('Not Approved', image.id);
  //   } else {
  //     this.imageService.updateImage('Approved', image.id);
  //   }
  // }

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
        console.error('Error retrieving all images:', error);
      }
    );
  }

  editUser(user: any) {
    console.log(user);
    this.singleUser = user;
    jQuery('#myModal').modal('show');
  }

  updateUser() {
    console.log(this.singleUser);
    this.service.updateUser(this.singleUser).subscribe((data: any) => { console.log(data); });
  }

  deleteUser(user: any) {
    this.service.deleteUser(user.userId).subscribe((data: any) => { console.log(data); });

    const i = this.users.findIndex((element: any) => {
      return element.userId == user.userId;
    });

    this.users.splice(i, 1);

    this.toastr.success('User Deleted Successfully!!!');
  }
}
