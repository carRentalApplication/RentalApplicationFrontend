import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { Booking } from 'src/app/model/Booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';


@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {

  customers!: AuthUser[];

  first = 0;

  rows = 10;

  constructor(private userService: BookingsService) {}
bookings:Booking[]=[];
  ngOnInit() {
      //this.userService.getCustomersLarge().then((customers) => (this.customers = customers));
    // this.BookingsByID;
    this.userService.getUserBookings().subscribe(data=>{
      console.log(data);

      this.bookings=data
    })
    }



//   fetchUserBookings() {
//     this.userService.getUserBookings().subscribe((bookings: Booking[]) => {
//       if (bookings.length > 0) {
//         this.booking = bookings[0]; // Assuming you want to display the first booking only
//         // this.vehicle = this.booking.vehicle;
//         console.log(bookings)
//       }
//       });
//     }

//   get BookingsByID(){
//    return this.userService.getUserBookings().subscribe(res=>{
//       console.log(res);
//       
//       })
//     }
}
