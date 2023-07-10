import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");


  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role)
  }

  public getFirstNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFirstNameForStore(firstname:string){
    this.fullName$.next(firstname)
  }

  // to get the role from token
  getRoleFromJwtToken()
  {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    if (token) {
      const helper = new JwtHelperService(); // Create an instance of JwtHelperService
      const decodedToken = helper.decodeToken(token); // Decode the JWT token

      if (decodedToken && decodedToken.role) {
        return decodedToken.role; // Return the value of the role property
      }
    }

    return null; // Return null if the token is null or the role property is not found
  }
}
