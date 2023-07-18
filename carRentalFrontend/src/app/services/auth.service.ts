import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../model/AuthUser.model';
import { JwtHelperService } from '@auth0/angular-jwt'
import { ResetPassword } from '../model/reset-password-model';
import { Booking } from '../model/Booking.model';

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

  forgotPassword(data:any){
    console.log(data);
    return this.http.post(this.baseUrl+`/api/Authuser/send-reset-email/${data}`,{responseType:'text'
    })
  }

  resetPassword(resetpasswordObj :ResetPassword){
    console.log(resetpasswordObj);
    return this.http.post(this.baseUrl+"/api/Authuser/reset-password",resetpasswordObj,{responseType:'text'
  })
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

  updateStatus(data:any){
    console.log(data);
    return this.http.put(this.baseUrl+"/api/Authuser/updatestatus",data,{responseType:'text'
    })
  }

  storeToken(token: string) {
    localStorage.setItem('token', token)
  }
  logoutMethod() {
    localStorage.clear()

  }

//   getUserBookings(): Observable<Booking[]> {
//     // Get the user ID from the token or any other way
//    var user= this.decodedToken()
//    var userId=user.id
//    return this.http.get<Booking[]>(`https://localhost:9002/api/Booking/user/${userId}`);
//   }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {

    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));

    return jwtHelper.decodeToken(token)
  }

  getFirstNameFromToken() {
    if (this.userPayload)
      return this.userPayload.firstname;
  }
  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
}
