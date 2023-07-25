import { AuthService } from 'src/app/services/auth.service';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/Booking.model';
import { Vehicle } from '../model/Vehicle.model';
import { BookingModel } from '../model/BookingModel.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  pickUpDate!:Date;
  dropDate!:Date;
  baseUrl = environment.urlCar;
  vehicle!:Vehicle;
  constructor(private http: HttpClient, private route: Router,private authService:AuthService) { }

  getAllBookings():Observable<Booking[]>{

    console.log("Booking Service all Bookings control");
    return this.http.get<Booking[]>(this.baseUrl + '/api/Booking');
  }
  addBooking(model:FormData):Observable<Booking>{
    console.log(model);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept','*/*')

    return this.http.post<Booking>(this.baseUrl+`/api/Booking`,model,{ headers })
  }

  updateBooking(id:any,data:string){
    console.log(id);
    console.log(data);
    return this.http.put(this.baseUrl+`/api/Booking/${id}/${data}`,{})
  }

  getUserBookings(): Observable<Booking[]> {
    // Get the user ID from the token or any other way
   var user= this.authService.decodedToken()
   var userId=user.id
   return this.http.get<Booking[]>(`https://localhost:9002/api/Booking/user/${userId}`);
  }

deleteBooking(id: number): Observable<Booking> {

  return this.http.delete<Booking>(`https://localhost:9002/api/Booking/${id}`)
}
}
