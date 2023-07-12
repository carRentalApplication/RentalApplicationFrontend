import { SharedModule } from './../../shared/shared.module';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  public rowData: any[];
  public columnDefs: ColDef[];

  searchText:any;
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

  constructor(private authService: AuthService,private sharedModule:SharedModule) {
    this.rowData = [
      {
        "userId": "935b754a-1ae3-4451-8999-0b54d5c685f9",
        "firstname": "Samundra",
        "lastname": "Singh",
        "email": "sam@gmail.com",
        "password": "Samundra@12345",
        "mobileNumber": "9845876987",
        "role": "user",
        "memberSince": "2023-07-05T00:00:53.2913149"
      },
    ];

    this.columnDefs = [
      { headerName: 'User ID', field: 'userId' },
      { headerName: 'First Name', field: 'firstname' },
      { headerName: 'Last Name', field: 'lastname' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Mobile Number', field: 'mobileNumber' },
      { headerName: 'Role', field: 'role' },
      { headerName: 'Member Since', field: 'memberSince' },
    ];
  }

  ngOnInit(): void {
    this.authService.getAllUser().subscribe((response) => {
      console.log(response);
      this.authUser = response
    })
  }
  onChange(status:any,id:any){
    console.log(status);
    console.log(id);
    console.log(status.toString());

    var data={
     status:status.toString(),
     id:id
    }
console.log(data);
    this.authService.updateStatus(data)
    .subscribe((response:any)=>{
      console.log(response);
      if(response==='Admin updated successfully')
      {
        this.sharedModule.showToast("Admin updated successfully","",'success')
      }
      else{
        this.sharedModule.showToast("User updated successfully","",'success')
      }

   },(error:any)=>{
     console.log(error.error?.message);
     if (error.error?.message) {
      console.log(error.error?.message);
     } else {
      console.log(error.error?.message);
     }
   })
   }
}
