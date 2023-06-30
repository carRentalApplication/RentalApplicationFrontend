import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

}
