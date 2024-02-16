import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'http://localhost:8085/image';

  constructor(private httpClient: HttpClient) {}

  updateSingleImage(formData: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updateSingleImage`,formData);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/upload`, formData);
  }

  updateImage(status : any, id : any) {
    return this.httpClient.get(`${this.baseUrl}/updateImage/${status}/${id}`);
  }

  deleteImage(id : any) {
    return this.httpClient.delete(`${this.baseUrl}/deleteImage/${id}`);
  }

  getImage(imageName: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/get/${imageName}`);
  }

  getAllImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllImages`);
  }

  getAllNotApprovedImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllNotApprovedImages`);
  }

  getImagesByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getImagesByCategory/${category}`);
  }

  getMyStack(ownerId: any): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllImagesByOwnerId/${ownerId}`)
  }

}
