import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: '', component:HomeComponent},
  {
  path:'home',
  component:HomeComponent
},{
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
},

{
  path: "admin",
  canActivate:[AuthenticationGuard],
  loadChildren:()=> import ('./admin/admin.module').then(x=> x.AdminModule)
},{
  path: "customer",
  loadChildren:()=> import ('./customer/customer.module').then(x=> x.CustomerModule)
},

// { path: "**", redirectTo:"home"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
