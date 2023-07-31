import { BookingsService } from 'src/app/services/bookings.service';
import { SharedModule } from './../../shared/shared.module';
import { Booking } from './../../model/Booking.model';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  constructor(private bookingsService: BookingsService,
    private userStore : UserStoreService,
    private sharedModule: SharedModule) {
    this.getAllBookings()
  }
  fadeOutAnimation: boolean = false;

  statusdetail: boolean = false;

  role() {
    return this.userStore.getRoleFromJwtToken();
  }


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

  onDeleteBooking(id: any) {

    // Event listener for the button click

            //  Swal.fire('Hello!', 'This is a SweetAlert popup!', 'success');

        const confirmed = window.confirm('Are you sure you want to delete this booking?');

        if(confirmed){
        this.bookingsService.deleteBooking(id).subscribe(
          (response) => {
            console.log('Booking deleted successfully:', response);
            // You can handle the success response here (e.g., show a success message).
            this.getAllBookings();
          },
          (error) => {
            console.error('Error deleting booking:', error);
            // You can handle the error response here (e.g., show an error message).
          }
        );
      }
    }

    //sort by date
    toggleSortingByDate() {
      this.sortTravellerNames(); // Trigger sorting when the checkbox is enabled
    }
    
    enableSortingByDate: boolean = false;

    sortTravellerNames() {
      if (this.enableSortingByDate) {
        // Sort based on dates
        this.booking.sort((a, b) => {
          const dateA = new Date(a.pickUpDate || '').getTime();
          const dateB = new Date(b.pickUpDate || '').getTime();

          return dateA - dateB;
        });
      } else {
        // Sort based on names
        this.booking.sort((a, b) => {
          const nameA = (a.travellerName || '').toLowerCase();
          const nameB = (b.travellerName || '').toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
    }
}
