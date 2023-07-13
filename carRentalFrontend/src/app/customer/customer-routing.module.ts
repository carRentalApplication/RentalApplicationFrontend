import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AboutComponent } from './about us/about.component';
import { ContactComponent } from './contact/contact.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';


const routes: Routes = [ // Redirect empty path to 'customer'
  { path: '', component: CustomerComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'vehicle-details/:id', component: VehicleDetailsComponent },
  { path: 'view-bookings', component: ViewBookingsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
