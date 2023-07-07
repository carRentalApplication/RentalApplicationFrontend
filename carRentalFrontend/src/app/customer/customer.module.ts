import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DisplaycarsComponent } from './customer-displaycar/displaycars.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerNavComponent } from './customer-NavBar/customer-nav.component';
import { AboutComponent } from './about us/about.component';


@NgModule({
  declarations: [
    CustomerNavComponent,
    DisplaycarsComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,

  ],
  exports:[
    CustomerNavComponent,
    DisplaycarsComponent,
    AboutComponent,
    ContactComponent
  ]
})
export class CustomerModule { }
