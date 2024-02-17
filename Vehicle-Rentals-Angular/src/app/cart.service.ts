// import { Injectable } from '@angular/core';

import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Declare an event emitter for cart clearing
  cartCleared: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  // Emit the event when the cart is cleared
  clearCart() {
    this.cartCleared.emit();
  }
}
