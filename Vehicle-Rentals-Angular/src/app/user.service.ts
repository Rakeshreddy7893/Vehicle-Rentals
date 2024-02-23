import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLoggedIn: boolean;
  loginStatus: any;

  user: any;
  otp: number;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
    this.loginStatus = new Subject();

    this.otp = 0;
    this.user = {
      userName: '',
      gender: '',
      country: '',
      role: '',
      phoneNumber: '',
      email: '',
      password: '',
    };
  }

  updateUser(user: any) {
    return this.http.put('http://localhost:8085/updateUser', user);
  }

  deleteUser(userId: any) {
    return this.http.delete('http://localhost:8085/deleteUserById/' + userId);
  }

  getAllUsers() {
    return this.http.get(`http://localhost:8085/getAllUsers`);
  }

  sendOtpToUser(phoneNumber: string, otp: number, email: string): Observable<any> {
    return this.http.get(`http://localhost:8085/sendOtp/${phoneNumber}/${otp}/${email}`);
  }

  getAllCountries(): any {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  registerUser(): any {
    return this.http.post('http://localhost:8085/addUser', this.user);
  }

  userLogin(emailId: any, password: any) {
    return this.http
      .get('http://localhost:8085/userLogin/' + emailId + '/' + password)
      .toPromise();
  }

  sendMail(mail: string, message: string) {
    return this.http.get(
      'http://localhost:8085/sendMail/' + mail + '/' + message
    );
  }

  setIsUserLoggedIn() {
    this.isUserLoggedIn = true;
    this.loginStatus.next(true);
  }

  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  getLoginStatus(): any {
    return this.loginStatus.asObservable();
  }

  setIsUserLoggedOut() {
    this.isUserLoggedIn = false;
    this.loginStatus.next(false);
  }
}
