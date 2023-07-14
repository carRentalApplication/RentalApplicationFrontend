import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.scss']
})
export class CustomerNavComponent implements OnInit {
  isDropdownVisible = false;
  isScrolled = false;
  navbarHeight = 100; // Set the height of your navbar here
  public userName:string='';
  constructor(private userService:AuthService,private route:Router,private toastr: ToastrService) { }


  get customer():any{
    const cust=localStorage.getItem("customer")
    // return JSON.parse(cust!)
    return this.userService.isLoggedIn();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) >= this.navbarHeight;
  }
  viewbookings()
  {
    this.route.navigateByUrl(`/customer/view-bookings`);
    this.toastr.success('Welcome to Your bookings!', 'Success');
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  removeCustomer(){
    this.userService.logoutMethod();
    this.route.navigateByUrl("/home");
    this.toastr.success('You are Logout Successfully..!','Logout')
  }

  holdDropdown(){
    this.isDropdownVisible = true;
  }



  ngOnInit(): void {
    this.userName = this.userService.getFirstNameFromToken();

  }

}
