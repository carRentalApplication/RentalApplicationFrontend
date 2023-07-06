import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Brand } from '../model/Brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl = environment.urlCar;

  constructor(private http: HttpClient, private route: Router) { }
  getAllBrands():Observable<Brand[]>{
    console.log("Brand Service all Brand control");

    return this.http.get<Brand[]>(this.baseUrl + '/api/Brands')
  }
  registeringBrand(data: any) {
    console.log(data+" from Brand serviceController..");
    return this.http.post(this.baseUrl + `/api/Brands`, data)
  }

  getBrand(id: number): Observable<Brand[]> {
    console.log("getvehicle by id " + id);
    return this.http.get<Brand[]>(this.baseUrl + `/api/Brands/${id}`);
  }
  updateBrand(id:number,brand:Brand){
    console.log('Updating Brand Service');
    return this.http.put(this.baseUrl+`/api/Brands/${id}`,brand);

  }
}
