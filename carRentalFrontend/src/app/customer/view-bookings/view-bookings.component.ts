
import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {

  customers!: AuthUser[];

  first = 0;

  rows = 10;

  constructor(private userService: AuthService) {}

  ngOnInit() {
      //this.userService.getCustomersLarge().then((customers) => (this.customers = customers));
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.customers ? this.first === this.customers.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.customers ? this.first === 0 : true;
  }



}
