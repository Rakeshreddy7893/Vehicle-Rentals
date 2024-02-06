import { Component, HostListener, ElementRef } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent {

  nav: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.nav = this.elementRef.nativeElement.querySelector('.nav');
  }

  @HostListener('window:scroll', ['$event'])
  fixNav(event: Event) {
    if (window.scrollY > this.nav.offsetHeight + 150) {
      this.nav.classList.add('active');
    } else {
      this.nav.classList.remove('active');
    }
  }
}