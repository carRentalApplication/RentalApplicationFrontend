
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
    console.log("from vehicle serviceController..");
    console.log(data);

    return this.http.post(this.baseUrl + `/api/Vehicles`, data)
  }

  getVehicle(id: number): Observable<Vehicle> {
    console.log("getvehicle by id " + id);
    return this.http.get<Vehicle>(this.baseUrl + `/api/Vehicles/${id}`);
  }
  updateVehicle(id:any,vehicle:Vehicle){
    console.log('Updating Vehicle Service');
    return this.http.put(this.baseUrl+`/api/Vehicles/${id}`,vehicle);
  }

  getAllVehicleCount(): Observable<Vehicle> {
    console.log("register-user-count Service");
    // console.log(this.getToken());
    return this.http.get<Vehicle>(this.baseUrl + '/api/Vehicles/register-vehicle-count')
  }
  deleteVehicle(vehicleId: any) {
    // throw new Error('Method not implemented.');
    console.log(vehicleId);

     return this.http.delete(this.baseUrl+`/api/Vehicles/${vehicleId}`)
   }


}
