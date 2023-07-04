import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/model/AuthUser.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  public authUser: AuthUser[] =
  []
    // [
    //   {
    //     UserId: "string",
    //     FirstName: "string",
    //     LastName: "string",
    //     Email: "string",
    //     Password: "string",
    //     MobileNumber: "string",
    //     Role: "string",
    //     MemberSince: "string"
    //   },
    // ];

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getAllUser().subscribe((response)=>
    {
     console.log(response);
     this.authUser = response
    })
  }

}
