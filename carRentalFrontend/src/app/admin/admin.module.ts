import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule
    
  ],exports: [
    SidebarComponent,
    MatIconModule
   ],
})
export class AdminModule { }
