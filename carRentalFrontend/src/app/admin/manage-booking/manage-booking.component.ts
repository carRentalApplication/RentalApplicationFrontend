import { SharedModule } from './../../shared/shared.module';
import { BookingsService } from './../../services/bookings.service';
import { Booking } from './../../model/Booking.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  constructor(private bookingsService: BookingsService,
    private sharedModule: SharedModule) {
    this.getAllBookings()
  }
  fadeOutAnimation: boolean = false;

  statusdetail: boolean = false;

  ngOnInit(): void { }
  searchText: any;
  //pop up
  show = false;
  openpop() {
    this.show = true;
  }
  closepop() {
    this.show = false;
  }
  //pop up end

  showBookingForm: boolean = false;

  booking: Booking[] = []

  getAllBookings() {
    this.bookingsService.getAllBookings().subscribe(res => {
      console.log(res);
      this.booking = res

    })
  }

  public status: string = "Confirm Booking";
  closeBookingForm() {

    this.showBookingForm = false;
  }

  bookingIdData: any;

  openBookingForm(id: any): void {
    this.showBookingForm = true;
    console.log(id);
    localStorage.setItem('id', id)
  }

  bookingAction(data: string) {
    let bookingId = localStorage.getItem('id')
    console.log(bookingId);
    if (data === "accept")
      console.log(data);
    else if (data === "reject") {
      console.log(data);
    }
    this.bookingsService.updateBooking(bookingId, data).subscribe(res => {
      console.log(res);
      this.sharedModule.showToast("Booking Done", "", "success")
      this.getAllBookings();
    })
    this.closeBookingForm()
  }
}
