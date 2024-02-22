import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCleared: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  clearCart() {
    this.cartCleared.emit();
  }
}
