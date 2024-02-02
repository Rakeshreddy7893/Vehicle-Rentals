import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getAllCountries(): any {
    return this.http.get('https://restcountries.com/v3.1/all');
  }



}
