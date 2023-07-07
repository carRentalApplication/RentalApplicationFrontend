import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../model/AuthUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url

  constructor(private http: HttpClient, private route: Router,) { }

  registerUser(data: any) {
    console.log(data);
    return this.http.post(this.baseUrl + "/api/Authuser/register", data, { responseType: 'text' })
  }

  loginUser(data: any) {
    console.log(data);
    return this.http.post(this.baseUrl + "/api/Authuser/login", data, { responseType: 'text' })
  }

  changePassword(data: any) {
    console.log(data);

    console.log("Change Password Works");
    return this.http.put(this.baseUrl + "/api/Authuser/changepassword", data, { responseType: 'text' })
  }

  getAllUser(): Observable<AuthUser[]> {
    console.log("Service");

    return this.http.get<AuthUser[]>(this.baseUrl + '/api/Authuser')
  }
  getAllUserCount(): Observable<AuthUser> {
    console.log("register-user-count Service");
    // console.log(this.getToken());
    return this.http.get<AuthUser>(this.baseUrl + '/api/Authuser/register-user-count')
  }

  storeToken(token: string) {
    localStorage.setItem('token', token)
  }

  logoutMethod() {
    localStorage.clear()
    this.route.navigate(['home'])
  }
  getToken() {
    return localStorage.getItem('token')
  }




  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  // isLoggedInCustomer(): Observable<AuthUser | any> {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     // If the token exists, you can make an HTTP request to retrieve the logged-in user
  //     return this.http.get<AuthUser>(this.baseUrl + '/api/Authuser/loggedInUser');
  //   } else {
  //     // If the token doesn't exist, return null or an empty object, depending on your preference
  //     return of(null); // or return of({});
  //   }
  // }

}
