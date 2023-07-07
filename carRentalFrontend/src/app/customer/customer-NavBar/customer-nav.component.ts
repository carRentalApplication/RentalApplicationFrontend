import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService:AuthService,private route:Router) { }


  get customer():AuthUser{
    const cust=localStorage.getItem("customer")
    return JSON.parse(cust!)
    // return this.customerRepo.getLogedInCustomer();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) >= this.navbarHeight;
  }
  viewCustomer()
  {
    this.route.navigateByUrl(`/`);
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
  }

  holdDropdown(){
    this.isDropdownVisible = true;
  }






  ngOnInit(): void {
  }

}
