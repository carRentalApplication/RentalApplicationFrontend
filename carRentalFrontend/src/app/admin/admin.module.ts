import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';


@NgModule({
  declarations: [SidebarComponent, HeaderComponent, DashboardComponent, ManageBrandComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule

  ],exports: [
    SidebarComponent,
    MatIconModule, HeaderComponent, DashboardComponent, ManageBrandComponent
   ],
})
export class AdminModule { }
