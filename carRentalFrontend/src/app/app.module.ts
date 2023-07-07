
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AnimationComponent } from './shared/animation/animation.component';



import { MatMenuModule } from '@angular/material/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({

  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CarouselComponent,
    AdminComponent,
    NavbarComponent,
    CustomerComponent,
    FooterComponent,
    AnimationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    CustomerModule,
    MatMenuModule,

    //materail
    MatSidenavModule,
    MatButtonModule,
    FormsModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
