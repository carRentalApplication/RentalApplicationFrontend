import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AboutComponent } from './about us/about.component';

const routes: Routes = [
  { path: '', component: CustomerComponent,},
  { path: 'about', component: AboutComponent },
{ path: "**", redirectTo:"home"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
