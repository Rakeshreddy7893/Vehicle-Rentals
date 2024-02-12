import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl = 'http://localhost:8085/image';

  constructor(private httpClient: HttpClient) {}

  uploadImage(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/upload`, formData);
  }

  getImage(imageName: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/get/${imageName}`);
  }

  getAllImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllImages`);
  }

  getImagesByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getImagesByCategory/${category}`);
  }

}
