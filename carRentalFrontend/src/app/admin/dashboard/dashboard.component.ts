import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getAllUsersCount()
  }

  public count:any;


  getAllUsersCount(){
    this.authService.getAllUserCount().subscribe(res=>{
      console.log(res);
      this.count=res
    })
  }

}
