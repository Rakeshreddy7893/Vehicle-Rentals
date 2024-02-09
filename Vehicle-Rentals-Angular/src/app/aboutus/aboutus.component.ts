import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent implements OnInit{

  constructor(private router:Router){}
  ngOnInit() {
    
  }

  registerMe(){
  this.router.navigate(['register']);

  }

}
