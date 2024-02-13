import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 
import { ToastrService } from 'ngx-toastr';

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

  constructor(private service: UserService, private toastr: ToastrService) {
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
