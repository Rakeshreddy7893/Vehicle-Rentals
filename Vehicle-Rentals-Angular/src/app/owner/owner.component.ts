import { Component } from '@angular/core';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css',
})
export class OwnerComponent {
  email: any;
  constructor() {
    this.email = localStorage.getItem('email');
  }
}
