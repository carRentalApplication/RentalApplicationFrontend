import { Booking } from './../../model/Booking.model';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  constructor(private brand:BrandService,) {
    this.getAllBookings()
   }
  fadeOutAnimation :boolean=false;

  statusdetail:boolean=false;

  data:any = [{
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
        },
        "vehicleImages": null
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
        },
        "vehicleImages": null
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
        },
        "vehicleImages": null
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

  ngOnInit(): void {}
  searchText:any;
  //pop up
  show = false;
  openpop() {
    this.show = true;
  }
  closepop() {
    this.show = false;
  }
  //pop up end

  onChange(data:any,id:number){
    console.log(id);
  }

  showBookingForm: boolean = false;

  booking:Booking[]=[]
  
  getAllBookings(){
    this.booking=this.brand.getAllBooking();
  }

  public status:string="Confirm Booking";
  closeBookingForm(){

    this.showBookingForm = false;
  }

  openBookingForm(): void {
    this.showBookingForm = true;
  }

}
