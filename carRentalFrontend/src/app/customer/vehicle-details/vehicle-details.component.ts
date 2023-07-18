
import { Booking } from './../../model/Booking.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { Vehicle } from 'src/app/model/Vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  isBooked: boolean = false;
  orderPrice?: number;
  orderStatus: string = 'pending';
  color: string = 'btn btn-primary';
  order: Booking = new Booking();
  vehicle: Vehicle = new Vehicle();
  customer: AuthUser | undefined;
  orderForm: FormGroup | undefined;
  vehicleId?:number;
  bookingForm!: FormGroup;
  showBookingForm: boolean = false;
  vehicleImages: any[] = [];
  currentImage: string = '';
  currentIndex: number = 0;
  examEndTime?: string;
  currentDateTime?: string;

  fromMinDate:Date=new Date();
  fromCurrentDate:Date=new Date();
  toMinDate:Date=new Date()
  toCurrentDate:Date=new Date()
  //minDateTime  :Date;
  constructor(
    private userService: AuthService,
    private vehicleService: VehicleService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private route:Router,
    private bookingService:BookingsService,


  ) {

  }

    get logedInCustomer(): boolean {
      return this.userService.isLoggedIn();
    }

    saveOrder() {


    }
    getMinDate() {

      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1; // January is 0
      const year = today.getFullYear();
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
    createBookingForm(): void {
      this.bookingForm = this.formBuilder.group({
        travellerName: ['', Validators.required],
        travellerNumber: ['', Validators.required],
        pickUpDate: ['', Validators.required],
        dropDate: ['', Validators.required],
      });
    }

    show = false;
    openpop() {
      this.show = true;
    }
    closepop() {
      this.show = false;
      this.isBooked=false;
    }
    openBookingForm(): void {
      console.log(this.fromMinDate,this.fromCurrentDate,this.toMinDate,this.toCurrentDate)
      if(this.userService.isLoggedIn()){
        this.vehicleService.getVehicleStatus(this.fromMinDate,this.toMinDate,this.vehicle.vehicleId!.toString())
        .subscribe(vehicleStatus=>{
          if(vehicleStatus){
            this.bookingService.pickUpDate=this.fromMinDate
            this.bookingService.dropDate=this.toMinDate
            this.bookingService.vehicle=this.vehicle
            const timeDiff = this.fromMinDate.getTime() - this.toMinDate.getTime();
            console.log(timeDiff)
              this.route.navigateByUrl('/customer/vehicle-booking')
          }
          else{
            Swal.fire({
              title:`${this.vehicle.vehicleName} Not Available For Selected Date`,
              icon:'error',
              allowOutsideClick:false
            })
          }
        })
      }else{
        this.route.navigate(['login'])
      }
    }

    closeBookingForm(): void {


      this.showBookingForm = false;
      this.bookingForm.reset();
    }
    submitBookingForm(): void {
      if (this.bookingForm.valid) {
        // Perform the necessary logic for booking the vehicle
        // You can access the form values using this.bookingForm.value
        // Example: Make an API call to book the vehicle
        console.log('Booking form submitted');
        console.log(this.bookingForm.value);

        // Close the booking form
        this.closeBookingForm();
      }
    }



    bookVehicle(): void {
      this.saveOrder();
      this.openpop();
      this.color = 'btn btn-warning';
      this.isBooked = true
    }
    ngOnInit(): void {
      this.vehicleId = this.activeRoute.snapshot.params['id'];
      if (this.vehicleId !== undefined) {
        this.getVehicleDetails(this.vehicleId);
      } else {
        console.error('Invalid vehicle ID');
      }
      this.fetchVehicleImages().then(images => {
        this.vehicleImages = images;
        this.currentImage = this.vehicleImages[0].imageUrl;
      });//For fetching multiple images
      this.createOrderForm();
      this.userService.isLoggedIn();
      this.createBookingForm();
    }


  getVehicleDetails(id: number): void {
  this.vehicleService.getVehicle(id).subscribe(
    (data=>this.vehicle=data),
    (error) => {
      console.error('Error fetching vehicle details:', error);
    }
  );
}

  createOrderForm(): void {
    this.orderForm = this.formBuilder.group({
      travellerName: [this.order.travellerName, Validators.required],
      travellerNumber: [this.order.travellerNumber, Validators.required],
      pickUpDate: [this.order.pickUpDate, Validators.required],
      dropDate: [this.order.dropDate, Validators.required],
      pickUpAddress: [this.order.pickUpAddress, Validators.required],
    });
  }


  fetchVehicleImages(): Promise<any[]> {
    // Simulating an API call or data retrieval
    return new Promise<any[]>(resolve => {
      setTimeout(() => {
        const images = [
          { imageUrl: 'path-to-image1.jpg' },
          { imageUrl: 'path-to-image2.jpg' },
          { imageUrl: 'path-to-image3.jpg' }
        ];
        resolve(images);
      }, 1000); // Simulating a delay of 1 second
    });
  }

  showPreviousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.vehicleImages.length) % this.vehicleImages.length;
    this.currentImage = this.vehicleImages[this.currentIndex].imageUrl;
  }

  showNextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.vehicleImages.length;
    this.currentImage = this.vehicleImages[this.currentIndex].imageUrl;
  }
}
