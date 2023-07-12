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

  searchText:any;
    //for pagination
    currentPage: number = 1;
    pageSize: number = 4;
    totalItems: number = 0;
    totalPages: number = 0;

  constructor(private vehicleService:VehicleService,private router:Router) {

    this.getAllVehicle();
    this.getCurrentPageProducts();

  }

  // constructor(private brandService:BrandService,private toster:ToastrService) {

  //   this.brandService.getAllBrands().subscribe(res=>{
  //     this.brandData=res;
  //     console.log(this.brandData.length);
  //     this.getCurrentPageProducts();
  //   })
  //  }

  public vehicleData: Vehicle[] =[]
  public vehicaledit?:Vehicle
  ngOnInit(): void {
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


  // for pagination methods start
  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
   getCurrentPageProducts(): Vehicle[] {
    console.log(this.vehicleData.length);
    this.totalItems = this.vehicleData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    console.log(this.vehicleData.slice(startIndex, endIndex));
    return this.vehicleData.slice(startIndex, endIndex);
   }
  //for oagination method ends

}
