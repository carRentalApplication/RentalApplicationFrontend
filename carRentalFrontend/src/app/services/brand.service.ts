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

    return this.http.get<Brand[]>(this.baseUrl + '/api/Brand')
  }
  registeringBrand(data: any) {
    console.log(data+" from Brand serviceController..");
    return this.http.post(this.baseUrl + `/api/Brand`, data)
  }

  getBrand(id: number): Observable<Brand[]> {
    console.log("getvehicle by id " + id);
    return this.http.get<Brand[]>(this.baseUrl + `/api/Brand/${id}`);
  }
  updateBrand(id:number,brand:Brand){
    console.log('Updating Brand Service');
    return this.http.put(this.baseUrl+`/api/Brand/${id}`,brand);
  }

  getAllBrandCount(): Observable<Brand> {
    console.log("register-user-count Service");
    // console.log(this.getToken());
    return this.http.get<Brand>(this.baseUrl + '/api/Brand/register-brand-count')
  }



  getAllBooking(){
    return [] = [{
      "bookingId": 14,
      "travellerName": "Maruthi",
      "travellerNumber": 9484744844,
      "pickUpDate": "2023-07-11T04:34:46.147",
      "dropDate": "2023-07-11T06:34:46.147",
      "bookingTime": "2023-07-11T04:34:46.147",
      "pickUpAddress": "Tvk",
      "advanceAmount": 300,
      "totalAmount": 1000,
      "status": {
        "statusId": 1,
        "statusName": "Pending"
      },
      "vehicle": {
        "vehicleId": 1,
        "vehicleName": "maruthi400",
        "vehicleNumber": "KA04L86",
        "seatingCapacity": 5,
        "fuelType": "petrol",
        "brand": {
          "brandId": 1,
          "brandName": "TATA"
        },
        "rent": {
          "rentId": 1,
          "rentAmount": 2000
        }
      },
      "authUser": {
        "userId": "9edc21f9-790f-43a2-a71c-137ccff2b240",
        "firstname": "Sreenivasa",
        "lastname": "H",
        "email": "hnsreeni5@gmail.com",
        "password": "925194@Sreeni",
        "mobileNumber": 7483727497,
        "role": "user",
        "memberSince": "2023-07-10T19:45:20.9105902"
      },
      "paymentType": {
        "paymentTypeId": 1,
        "paymentMode": "Cash"
      }
    },{
      "bookingId": 14,
      "travellerName": "Maruthi",
      "travellerNumber": 9484744844,
      "pickUpDate": "2023-07-11T04:34:46.147",
      "dropDate": "2023-07-11T06:34:46.147",
      "bookingTime": "2023-07-11T04:34:46.147",
      "pickUpAddress": "Tvk",
      "advanceAmount": 300,
      "totalAmount": 1000,
      "status": {
        "statusId": 1,
        "statusName": "Confirm"
      },
      "vehicle": {
        "vehicleId": 1,
        "vehicleName": "maruthi400",
        "vehicleNumber": "KA04L86",
        "seatingCapacity": 5,
        "fuelType": "petrol",
        "brand": {
          "brandId": 1,
          "brandName": "TATA"
        },
        "rent": {
          "rentId": 1,
          "rentAmount": 2000
        }
      },
      "authUser": {
        "userId": "9edc21f9-790f-43a2-a71c-137ccff2b240",
        "firstname": "Sreenivasa",
        "lastname": "H",
        "email": "hnsreeni5@gmail.com",
        "password": "925194@Sreeni",
        "mobileNumber": 7483727497,
        "role": "user",
        "memberSince": "2023-07-10T19:45:20.9105902"
      },
      "paymentType": {
        "paymentTypeId": 1,
        "paymentMode": "Cash"
      }
    },{
      "bookingId": 14,
      "travellerName": "Maruthi",
      "travellerNumber": 9484744844,
      "pickUpDate": "2023-07-11T04:34:46.147",
      "dropDate": "2023-07-11T06:34:46.147",
      "bookingTime": "2023-07-11T04:34:46.147",
      "pickUpAddress": "Tvk",
      "advanceAmount": 300,
      "totalAmount": 1000,
      "status": {
        "statusId": 1,
        "statusName": "Pending"
      },
      "vehicle": {
        "vehicleId": 1,
        "vehicleName": "maruthi400",
        "vehicleNumber": "KA04L86",
        "seatingCapacity": 5,
        "fuelType": "petrol",
        "brand": {
          "brandId": 1,
          "brandName": "TATA"
        },
        "rent": {
          "rentId": 1,
          "rentAmount": 2000
        }
      },
      "authUser": {
        "userId": "9edc21f9-790f-43a2-a71c-137ccff2b240",
        "firstname": "Sreenivasa",
        "lastname": "H",
        "email": "hnsreeni5@gmail.com",
        "password": "925194@Sreeni",
        "mobileNumber": 7483727497,
        "role": "user",
        "memberSince": "2023-07-10T19:45:20.9105902"
      },
      "paymentType": {
        "paymentTypeId": 1,
        "paymentMode": "Cash"
      }
    },{
      "bookingId": 14,
      "travellerName": "Maruthi",
      "travellerNumber": 9484744844,
      "pickUpDate": "2023-07-11T04:34:46.147",
      "dropDate": "2023-07-11T06:34:46.147",
      "bookingTime": "2023-07-11T04:34:46.147",
      "pickUpAddress": "Tvk",
      "advanceAmount": 300,
      "totalAmount": 1000,
      "status": {
        "statusId": 1,
        "statusName": "Cancel"
      },
      "vehicle": {
        "vehicleId": 1,
        "vehicleName": "maruthi400",
        "vehicleNumber": "KA04L86",
        "seatingCapacity": 5,
        "fuelType": "petrol",
        "brand": {
          "brandId": 1,
          "brandName": "TATA"
        },
        "rent": {
          "rentId": 1,
          "rentAmount": 2000
        }
      },
      "authUser": {
        "userId": "9edc21f9-790f-43a2-a71c-137ccff2b240",
        "firstname": "Sreenivasa",
        "lastname": "H",
        "email": "hnsreeni5@gmail.com",
        "password": "925194@Sreeni",
        "mobileNumber": 7483727497,
        "role": "user",
        "memberSince": "2023-07-10T19:45:20.9105902"
      },
      "paymentType": {
        "paymentTypeId": 1,
        "paymentMode": "Cash"
      }
    }]
  }
}
