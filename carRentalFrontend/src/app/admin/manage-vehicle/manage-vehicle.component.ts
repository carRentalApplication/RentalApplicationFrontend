import { Vehicle } from 'src/app/model/Vehicle.model';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.scss']
})
export class ManageVehicleComponent implements OnInit {

  constructor(private vehicleService:VehicleService) { }


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
