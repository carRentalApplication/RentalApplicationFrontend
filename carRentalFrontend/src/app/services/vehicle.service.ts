
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Vehicle } from '../model/Vehicle.model';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl = environment.urlCar;

  constructor(private http: HttpClient, private route: Router) { }

  getAllVehicles():Observable<Vehicle []>{
    console.log("Vehicle Service all vehicle control");

    return this.http.get<Vehicle[]>(this.baseUrl + '/api/Vehicles')
  }
  registeringVehicle(data: any) {
    console.log(data+" from vehicle serviceController..");
    return this.http.post(this.baseUrl + `/api/Vehicles`, data)
  }

  getVehicle(id: number): Observable<Vehicle[]> {
    console.log("getvehicle by id " + id);
    return this.http.get<Vehicle[]>(this.baseUrl + `/api/Vehicles/${id}`);
  }
  updateVehicle(id:number,vehicle:Vehicle){
    console.log('Updating Vehicle Service');
    return this.http.put(this.baseUrl+`/api/Vehicles/${id}`,vehicle);

  }
  

}