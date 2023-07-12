
import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/model/AuthUser.model';
import { Brand } from 'src/app/model/Brand.model';
import { Vehicle } from 'src/app/model/Vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(private vehicleService: VehicleService, private userService: AuthService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      console.log(this.vehicles);
    });
  }

  get customer(): AuthUser | any {
    return this.userService.isLoggedIn();
  }

  applyFilter() {
    this.filteredCars = this.vehicles.filter((car) =>
      car.vehicleName?.toLowerCase().includes(this.searchByCarType.toLowerCase())
    );
  }


}
