import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn : boolean;

  constructor(private http : HttpClient) {
    this.isUserLoggedIn = false;
   }

  getAllCountries(): any {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
  
  registerUser(user:any):any{
    return this.http.post('http://localhost:8085/addUser',user);
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
