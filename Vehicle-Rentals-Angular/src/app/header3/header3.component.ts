import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrl: './header3.component.css'
})
export class Header3Component implements OnInit {
  constructor(private router :Router){

  }


  ngOnInit() {
    
  }

  redirectToMyStack(){
    this.router.navigate(['mystack'])
  }

  redirectToLogin(){
    this.router.navigate(['login']);
  }

  redirectToContact(){
    this.router.navigate(['contact'])
  }

  redirectToImage(){
    this.router.navigate(['owner']);
  }

}
