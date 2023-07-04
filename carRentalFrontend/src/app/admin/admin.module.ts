import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AppComponent } from '../app.component';



// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageVehicleComponent } from './manage-vehicle/manage-vehicle.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { CommonModule } from '@angular/common';


import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ManageBrandComponent,
    AppComponent,
    AdminHomeComponent,
    AdminHomeComponent,
    ManageVehicleComponent,
    ManageUserComponent,
    ManageBookingComponent
  ],
  imports: [
    MatSidenavModule,
    MatIconModule,
    AdminRoutingModule,
    //materail
    MatSidenavModule,
    MatToolbarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    CommonModule,
    AgGridModule


  ], exports: [

    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ManageBrandComponent,
    AppComponent,
    AdminHomeComponent,
    ManageVehicleComponent,
    ManageUserComponent,
    ManageBookingComponent
  ],
})
export class AdminModule { }
