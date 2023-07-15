
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DisplaycarsComponent } from './customer-displaycar/displaycars.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerNavComponent } from './customer-NavBar/customer-nav.component';
import { AboutComponent } from './about us/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import{CalendarModule} from 'primeng/calendar'
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ToastrService } from 'ngx-toastr';
import { VehicleBookingComponent } from './vehicle-booking/vehicle-booking.component';


@NgModule({
  declarations: [
    CustomerNavComponent,
    DisplaycarsComponent,
    AboutComponent,
    ContactComponent,
    VehicleDetailsComponent,
    ViewBookingsComponent,
    VehicleBookingComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    InputSwitchModule

  ],
  exports:[
    CustomerNavComponent,
    DisplaycarsComponent,
    AboutComponent,
    ContactComponent,
    VehicleDetailsComponent,
    ViewBookingsComponent,
  ],
  providers: [ToastrService]
})
export class CustomerModule { }
