import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8085/documents';

  constructor(private httpClient: HttpClient) { }

  uploadImage(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/upload`, formData);
  }

  updateDocumentImageStatus(status : any, id : any) {
    return this.httpClient.get(`${this.baseUrl}/updateDocument/${status}/${id}`);
  }

  getAllApprovedDocImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllApprovedDocImages`);
  }

  getAllNotApprovedDocImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllNotApprovedDocImages`);
  }

  getAllDocImages(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAllDocImages`);
  }

  // isCustomerDocsPresent(customerid : any){
  //   return this.httpClient.get<any[]>(`${this.baseUrl}/customerinfo/${customerid}`);
  // }

  getDrivingLicenseStatus(customerid : any) : Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/customerstatus/${customerid}`);
  }

}