
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PaymentType } from '../model/PaymentType.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymenttypeserviceService {
  baseUrl = environment.urlCar;
  constructor(private http: HttpClient, private route: Router) { }

  getAllPaymentTypes():Observable<PaymentType[]>{
    return this.http.get<PaymentType[]>(this.baseUrl+`/api/PaymentType`)
  }
}
