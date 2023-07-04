import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, /* for admin */
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'managebrand', component: ManageBrandComponent },
      { path: 'managebooking', component: ManageBookingComponent },
      { path: 'managevehicle', component: ManageVehicleComponent },
      { path: 'home', component: DashboardComponent },
    ]
  },
  { path: "**", redirectTo:"admin/dashboard"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AdminRoutingModule { }
