import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../model/AuthUser.model';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.url

  private userPayload: any;

  constructor(private http: HttpClient, private route: Router,) {
    this.userPayload = this.decodedToken();
  }

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

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getFirstNameFromToken() {
    if(this.userPayload)
    return this.userPayload.firstname;
  }
  getRoleFromToken() {
    if(this.userPayload)
    return this.userPayload.role;
  }
}
