import { Vehicle } from 'src/app/model/Vehicle.model';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.scss']
})
export class ManageVehicleComponent implements OnInit {
  isEditMode = false;


  constructor(private vehicleService:VehicleService,private router:Router) { }


  public vehicleData: Vehicle[] =[]
  ngOnInit(): void {
    this.getAllVehicle();
  }


  getAllVehicle(){
    this.vehicleService.getAllVehicles().subscribe(res=>{
      console.log(res);
      this.vehicleData=res
    })
  }

 
}
