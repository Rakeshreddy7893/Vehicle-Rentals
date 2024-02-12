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
}
