import { AuthUser } from 'src/app/model/AuthUser.model';
import { UserStoreService } from './../../services/user-store.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedInDetails = false;
  // expression:
  constructor(private userStore: UserStoreService,
    private authUser: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  role() {
    return this.userStore.getRoleFromJwtToken();
  }

  isLoggedIn() {
    this.isLoggedInDetails = this.authUser.isLoggedIn();
    console.log(this.authUser.isLoggedIn());
    return this.isLoggedInDetails
  }
  logout() {
    confirm("Do you want to log out")
    localStorage.clear()
    this.isLoggedIn()
  }
}
