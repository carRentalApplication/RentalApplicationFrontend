
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


import { ViewBookingsComponent } from './view-bookings/view-bookings.component';


@NgModule({
  declarations: [
    CustomerNavComponent,
    DisplaycarsComponent,
    AboutComponent,
    ContactComponent,
    VehicleDetailsComponent,

    ViewBookingsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  

  ],
  exports:[
    CustomerNavComponent,
    DisplaycarsComponent,
    AboutComponent,
    ContactComponent,
    VehicleDetailsComponent,
    ViewBookingsComponent,
  ]
})
export class CustomerModule { }
