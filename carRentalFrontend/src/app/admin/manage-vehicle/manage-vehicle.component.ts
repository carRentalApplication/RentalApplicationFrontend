import { Vehicle } from 'src/app/model/Vehicle.model';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.scss']
})
export class ManageVehicleComponent implements OnInit {
  isEditMode = false;


  constructor(private vehicleService:VehicleService,private router:Router) { }


  public vehicleData: Vehicle[] =[]
  public vehicaledit?:Vehicle
  ngOnInit(): void {
    this.getAllVehicle();
  }


  delete(index: any) {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
      console.log(index );
      this.vehicleService.deleteVehicle(index ).subscribe(() => {
        // Delete successful, perform any additional actions if needed
      });
    } else {
      // User canceled the deletion, handle accordingly
    }
  }

  edit(index:any)
  {
    console.log(index);

    console.log(this.vehicleData.filter(e=>e.vehicleId==index)[0]);
    this.vehicaledit=this.vehicleData.filter(e=>e.vehicleId==index)[0]
    this.router.navigate(['admin/addvehicle/',this.vehicaledit.vehicleId])
    //return this.vehicaledit


  }

  getAllVehicle(){
    this.vehicleService.getAllVehicles().subscribe(res=>{
      console.log(res);
      this.vehicleData=res
    })
  }

  // editVehicle(vehicleId: number) {
  //   this.router.navigate(['/admin/editVehicle', vehicleId]);
  // }

  // editButton(vehicleId:number){
  //   this.router.navigate(['/edit',vehicleId]);

  // }
}
