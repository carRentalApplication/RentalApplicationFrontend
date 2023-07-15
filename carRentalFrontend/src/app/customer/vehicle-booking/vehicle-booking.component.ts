import { SharedModule } from './../../shared/shared.module';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/model/Booking.model';
import { MessageModule } from 'primeng/message';
import { PaymentType } from 'src/app/model/PaymentType.model';
import { BookingsService } from 'src/app/services/bookings.service';
import { Vehicle } from 'src/app/model/Vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Message } from 'primeng/api';
import { PaymenttypeserviceService } from 'src/app/services/paymenttypeservice.service';
import { BookingModel } from 'src/app/model/BookingModel.model';

@Component({
  selector: 'app-vehicle-booking',
  templateUrl: './vehicle-booking.component.html',
  styleUrls: ['./vehicle-booking.component.scss']
})
export class VehicleBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  done=false;
  orderForm: FormGroup | undefined;
  order: Booking = new Booking();
  pickUpDate!:Date;
  dropDate!:Date;
  vehicle!:Vehicle
  messages:Message[]=[ { severity: 'success', summary: 'Success Message', detail: 'This is a success message.' }]
  totalAmount?:number
  model:BookingModel=new BookingModel();
  paymentTypes:PaymentType[]=[]
  constructor(private formBuilder: FormBuilder,private paymentService:PaymenttypeserviceService,
    private bookingService:BookingsService,private authService:AuthService,
    private route:Router,
    private sharedModule:SharedModule) { }

  ngOnInit(): void {
    this.createBookingForm();
    this.createOrderForm()
    this.paymentService.getAllPaymentTypes().subscribe(data=>this.paymentTypes=data)
    this.pickUpDate=this.bookingService.pickUpDate
    this.dropDate=this.bookingService.dropDate
    this.vehicle=this.bookingService.vehicle
    this.bookingForm.get('pickUpDate')?.setValue(this.pickUpDate)
    this.bookingForm.get('dropDate')?.setValue(this.dropDate)
    this.calculateTotalAmount(this.pickUpDate,this.dropDate)

  }

  calculateTotalAmount(fromDate:Date,toDate:Date){
    const timeDiff = toDate.getTime() - fromDate.getTime();

// Convert the time difference to hours
    const hourDiff = timeDiff / (1000 * 60 * 60);
  console.log(hourDiff)
  this.totalAmount=this.vehicle.rent?.rentAmount!*hourDiff
  console.log(this.vehicle.rent?.rentAmount)
  this.bookingForm.get('totalAmount')?.setValue(this.totalAmount)
  console.log(this.totalAmount)
  this.totalAmountDisplay=this.totalAmount
  }
  createBookingForm(): void {
    this.bookingForm = this.formBuilder.group({
      travellerName: ['', [Validators.required, Validators.pattern(/^[^\s].*$/)]],
      travellerNumber: ['',[ Validators.required,Validators.pattern(/^\d{10}$/)]],
      pickUpDate: ['', Validators.required],
      dropDate: ['', Validators.required],
      pickUpAddress:['',Validators.required],
      paymentType:['',Validators.required],
      totalAmount:['',Validators.required],
      checked:['']
    });
  }
  createOrderForm(): void {
    this.orderForm = this.formBuilder.group({
      travellerName: [this.order.travellerName, Validators.required],
      travellerNumber: [this.order.travellerNumber, Validators.required],
      pickUpDate: [this.order.pickUpDate, Validators.required],
      dropDate: [this.order.dropDate, Validators.required],
      pickUpAddress: [this.order.pickUpAddress, Validators.required],
      totalAmount: [this.order.totalAmount,Validators.required],
      paymentType:[this.order.paymentTpe?.paymentMode,Validators.required],
    });
  }
  ValueChanged(){
    var user=this.bookingForm.get('checked')?.value
    if(user==true){
      var authUser=this.authService.decodedToken()

      this.bookingForm.get('travellerName')?.setValue(authUser.firstname+" "+authUser.lastname)
      this.bookingForm.get('travellerNumber')?.setValue(authUser.mobilenumber)
    }
    else{
      this.bookingForm.get('travellerName')?.setValue('')
      this.bookingForm.get('travellerNumber')?.setValue('')
    }
  }
  totalAmountDisplay:any;
  submitBookingForm(): void {
    if (this.bookingForm.valid) {

     var authUser=this.authService.decodedToken()
     console.log(authUser)
      this.model.travallerName=this.bookingForm.get('travellerNumber')?.value
      this.model.travallerNumber=Number.parseInt(this.bookingForm.get('travellerNumber')?.value)
      this.model.pickUpDate=this.pickUpDate.toISOString()
      this.model.dropDate=this.dropDate.toISOString()
      this.model.pickUpAddress=this.bookingForm.get('pickUpAddress')?.value
      this.model.totalAmount=this.totalAmount

      this.model.vehicleId=this.vehicle.vehicleId
      this.model.userId=authUser.id
      this.model.paymentMode=this.bookingForm.get('paymentType')?.value
      console.log(this.bookingForm.get('paymentType'))
      console.log(this.bookingForm.get('paymentType')?.value)
      console.log(this.model)
      this.bookingService.addBooking(this.model).subscribe(data=> {
        this.done=true
        console.log('Booking form submitted');
        this.sharedModule.showToast("Booking form submitted","","success")
        this.route.navigate(['customer'])
        console.log(data)
      })
      this.done=true
      console.log(this.bookingForm.value);

      // Close the booking form

    }
    else{
      console.log("=============")
    }
  }
}
