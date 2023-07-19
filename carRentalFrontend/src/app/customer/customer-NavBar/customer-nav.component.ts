import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
  constructor(private userService:AuthService,
    private userStore:UserStoreService,private route:Router,private toastr: ToastrService,private authUser:AuthService) { }

    public isLoggedInDetails = false;

  ngOnInit(): void {
    this.isLoggedIn()
  this.userStore.getFirstNameFromStore().subscribe(res=>{
  let firstNameFromToken = this.userService.getFirstNameFromToken();
  this.userName= res || firstNameFromToken
  })
  }


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
    if(this.authUser.isLoggedIn()){
      this.route.navigateByUrl(`/customer/view-bookings`);
      this.toastr.success('Welcome to Your bookings!', 'Success');
    }
    else{
      this.route.navigateByUrl("/login");
    }

  }


  role() {
    return this.userStore.getRoleFromJwtToken();
  }

  isLoggedIn() {
    this.isLoggedInDetails = this.authUser.isLoggedIn();
    console.log(this.authUser.isLoggedIn());
    return this.isLoggedInDetails
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  removeCustomer(){
    this.userService.logoutMethod();
    this.viewbookings();
    this.toastr.success('You are Logout Successfully..!','Logout')
  }

  holdDropdown(){
    this.isDropdownVisible = true;
  }



}
