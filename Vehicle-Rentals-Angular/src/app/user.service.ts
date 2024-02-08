import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn : boolean;

  user : any;
  otp : number;

  constructor(private http : HttpClient) {
    this.isUserLoggedIn = false;

    this.otp = 0;
    this.user ={
      userName:'',
      gender:'',
      country:'',
      role:'',
      phoneNumber:'',
      email:'',
      password:''
    }
  }

  sendOtpToUser(phoneNumber: string, otp: number): Observable<any> {
    return this.http.get(`http://localhost:8085/sendOtp/${phoneNumber}/${otp}`);
  }

  getAllCountries(): any {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
  
  registerUser():any{
    return this.http.post('http://localhost:8085/addUser',this.user);
  }
 
  userLogin(emailId:any,password:any){
    return this.http.get('http://localhost:8085/userLogin/' + emailId +'/'+ password).toPromise();
  }

setIsUserLoggedIn(){
   this.isUserLoggedIn = true;
}

getIsUserLoggedIn():boolean{
  return this.isUserLoggedIn;
}


}
