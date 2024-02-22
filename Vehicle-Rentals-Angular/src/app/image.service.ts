import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  cartItems: any;
  cartChanged: EventEmitter<void> = new EventEmitter<void>();

  private baseUrl = 'http://localhost:8085/image';

  constructor(private httpClient: HttpClient) {
    this.cartItems = [];
  }

  updateSingleImage(formData: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updateSingleImage`, formData);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/upload`, formData);
  }

  updateImage(status: any, id: any) {
    return this.httpClient.get(`${this.baseUrl}/updateImage/${status}/${id}`);
  }

  deleteImage(id: any) {
    return this.httpClient.delete(`${this.baseUrl}/deleteImage/${id}`);
  }

  getImage(imageName: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/get/${imageName}`);
  }

  getAllImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllImages`);
  }

  getAllNotApprovedImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrl}/getAllNotApprovedImages`
    );
  }

  getImagesByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrl}/getImagesByCategory/${category}`
    );
  }

  getMyStack(ownerId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrl}/getAllImagesByOwnerId/${ownerId}`
    );
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartChanged.emit();
  }

  getCartItems(): any {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  setCartItems(count: any) {
    this.cartItems = count;
  }
}
