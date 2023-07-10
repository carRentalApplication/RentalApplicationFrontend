import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddBrandComponent } from './manage-brand/add-brand/add-brand.component';
import { AddVehicleComponent } from './manage-vehicle/add-vehicle/add-vehicle.component';

const routes: Routes = [
  {
    path: '', // Remove the empty path as it's already defined in the AppRoutingModule
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'managebrand', component: ManageBrandComponent },
      { path: 'managebooking', component: ManageBookingComponent },
      { path: 'managevehicle', component: ManageVehicleComponent },
      { path: 'manageuser', component: ManageUserComponent },
      { path: 'home', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect 'home' to 'dashboard'
      { path: 'addbrand', component: AddBrandComponent }, // Remove 'admin/' prefix
      { path: 'addvehicle', component: AddVehicleComponent }, // Remove 'admin/' prefix
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AdminRoutingModule { }
