import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HasRoleGuard } from './guard/has-role-guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect empty path to 'home'
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard, HasRoleGuard],
    data: {
      role: 'admin'
    },
    loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  },
  {
    path: 'customer',
    canActivate: [AuthenticationGuard,HasRoleGuard],
    data: {
      role: 'user',
      role1: 'admin'
    },
    loadChildren: () => import('./customer/customer.module').then(x => x.CustomerModule)
  },
  { path: '**', redirectTo: 'home' }, // Redirect any unknown route to 'home'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
