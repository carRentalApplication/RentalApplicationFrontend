import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  getAllUser(): Observable<AuthUser[]> {
    console.log("Service");

    return this.http.get<AuthUser[]>(this.baseUrl + '/api/Authuser')
  }
  getAllUserCount(): Observable<AuthUser> {
    console.log("register-user-count Service");

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
    localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

}
