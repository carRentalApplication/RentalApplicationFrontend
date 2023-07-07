
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

  filterText: string = '';
  public vehicles: Vehicle[] = [];
  public props?: Vehicle[];
  public names?: String[];
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


  get vehiclesBasedOn(): Vehicle[] {
    if (this.filterText === '') {
      this.props = this.vehicles;
    } else {
      this.props = this.vehicles.filter(p => p.vehicleName.toLocaleLowerCase() === this.filterText.toLocaleLowerCase());
    }

    if (this.sortBy === "seatingcapacity") {
      this.props.sort((a, b) => a.seatingCapacity - b.seatingCapacity);
    } else if (this.sortBy === "rent") {
      this.props.sort((a, b) => b.rent_Id.rentAmount - a.rent_Id.rentAmount);
    }

    if (this.searchByName !== '') {
      this.props = this.props.filter(p => p.vehicleName.toLocaleLowerCase().match(this.searchByName!.toLocaleLowerCase().trim()));
    }

    return this.props;
  }

  get customer(): AuthUser | any {
    return this.userService.isLoggedIn();
  }
  // loadVehicles() {
  //   this.vehicles.forEach((vehicle) => {
  //     const brand = this.brands.find((b: { brandId: Brand; }) => b.brandId === vehicle.brandId);
  //     if (brand) {
  //       vehicle.brandId = brand;
  //     }
  //   });
  // }

}
