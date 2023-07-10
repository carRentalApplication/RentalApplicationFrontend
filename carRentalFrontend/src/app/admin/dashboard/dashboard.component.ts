import { VehicleService } from 'src/app/services/vehicle.service';
import { BrandService } from 'src/app/services/brand.service';
import { SharedModule } from './../../shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService,
    private brandService:BrandService,
    private vehicleService:VehicleService,
  private sharedModule:SharedModule) { }

  ngOnInit(): void {
    this.getAllUsersCount()
    this.getAllBrandCount()
    this.getAllVehicleCount()
  }

  public countOfBrand:any;
  public countOfUsers:any;
  public countOfVehicle:any;

  getAllUsersCount(){
    this.authService.getAllUserCount().subscribe(res=>{
      console.log(res);
      this.countOfUsers=res
    })
  }
  getAllBrandCount(){
    this.brandService.getAllBrandCount().subscribe(res=>{
      console.log(res);
      this.countOfBrand=res
    })
  }
  getAllVehicleCount(){
    this.vehicleService.getAllVehicleCount().subscribe(res=>{
      console.log(res);
      this.countOfVehicle=res
    })
  }


}
