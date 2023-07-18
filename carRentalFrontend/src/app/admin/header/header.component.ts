import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 public userName:string="Ankush";

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,private authService:AuthService,
    private userStore:UserStoreService) {}

  ngOnInit(): void {
    this.userStore.getFirstNameFromStore().subscribe(res=>{
      let firstNameFromToken = this.authService.getFirstNameFromToken();
      this.userName= res || firstNameFromToken
    })
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(){
    console.log("Logout trigger");
    this.authService.logoutMethod()
    this.router.navigateByUrl("/customer")
  }


}
