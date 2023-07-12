import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { Brand } from 'src/app/model/Brand.model';
import { Vehicle } from 'src/app/model/Vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-displaycars',
  templateUrl: './displaycars.component.html',
  styleUrls: ['./displaycars.component.scss']
})
export class DisplaycarsComponent implements OnInit {
  searchByCarType: string ='';
  filteredCars?: any[];
  filterText: string = '';
  public vehicles: Vehicle[] = [];
  public props?: Vehicle[];
  public searchByName?: string = '';
  public sortBy?: string = "Most Blocked By Users";
  public brands? :any;
  constructor(private vehicleService: VehicleService, private userService: AuthService
    ,private brandService:BrandService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      console.log(this.vehicles);
    });
    this.brandService.getAllBrands().subscribe((brands)=>{
      console.warn(brands)
      this.brands=brands;
      console.warn(this.brands)
    })
  }


  get vehiclesBasedOn(): Vehicle[] {
    if (this.filterText === '' && this.searchByName==='') {
      this.props = this.vehicles;
    } else if(this.filterText != '' && this.searchByName===''){
      this.props = this.vehicles.filter(v=> v.brand?.brandName==this.filterText)
    }
    else if(this.filterText === '' && this.searchByName!=''){
    this.props = this.vehicles.filter(v=> v.vehicleName?.includes(this.searchByName!))
    }
    else{
      this.props=this.vehicles.filter((vehicle)=>{
        return vehicle.brand?.brandName===this.filterText && vehicle.vehicleName?.includes(this.searchByName!)
      })
    }


    return this.props;
  }

  get customer(): AuthUser | any {
    return this.userService.isLoggedIn();
  }





}
