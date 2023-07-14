import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  seatingFilter: string = '';
  filteredSeatingOptions: number[] = [];
  seatingOptions:number[]=[];
  public vehicles: Vehicle[] = [];
  public props?: Vehicle[];

  public searchByName: string='';
  public sortBy?: string = "Most Blocked By Users";
  public brands? :any;
 // public seats? :any;
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of items to display per page
  displayedVehicles: any[] = [];


  constructor(
    private vehicleService: VehicleService,
    private userService: AuthService,
    private brandService: BrandService,
    private ngxLoaderService: NgxUiLoaderService
  ) { }
  showLoader() {
    this.ngxLoaderService.start(); // Show the loader
  }

  hideLoader() {
    this.ngxLoaderService.stop(); // Hide the loader
  }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.updateSeatingOptions();
      this.updateDisplayedVehicles();
    });

    this.brandService.getAllBrands().subscribe((brands) => {
      this.brands = brands;
    });
    this.vehicleService.getAllVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      this.updateSeatingOptions();
    });
  }
  updateSeatingOptions(): void {
    let filteredVehicles = this.vehicles;

    if (this.filterText) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.brand?.brandName === this.filterText
      );
    }

    this.filteredSeatingOptions = Array.from(
      new Set(
        filteredVehicles
          .map(vehicle => vehicle.seatingCapacity)
          .filter(seatingCapacity => seatingCapacity !== undefined)
      )
    ) as number[];
    this.filteredSeatingOptions.sort((a, b) => a - b);
  }

  get vehiclesBasedOn(): Vehicle[] {
    let filteredVehicles = this.vehicles;

    if (this.filterText) {
      filteredVehicles = filteredVehicles.filter(
        vehicle =>
          vehicle.brand?.brandName?.toLowerCase().includes(this.filterText.toLowerCase()) ||
          vehicle.vehicleName?.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }

    if (this.seatingFilter) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.seatingCapacity === parseInt(this.seatingFilter, 10)
      );
    }

    if (this.searchByName) {
      filteredVehicles = filteredVehicles.filter(
        vehicle =>
          vehicle.vehicleName?.toLowerCase().includes(this.searchByName.toLowerCase()) ||
          vehicle.brand?.brandName?.toLowerCase().includes(this.searchByName.toLowerCase())
      );
    }

    return filteredVehicles;
  }


  get customer(): AuthUser | any {
    return this.userService.isLoggedIn();
  }

  // Method to set the current page
  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedVehicles();
  }

  updateDisplayedVehicles() {
    this.showLoader();
    const filteredVehicles = this.vehiclesBasedOn;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedVehicles = filteredVehicles.slice(startIndex, endIndex);
    this.hideLoader();
  }

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.vehiclesBasedOn.length / this.itemsPerPage);
  }

  // Generate an array of page numbers
  getPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  filterVehiclesByBrand() {
    this.currentPage = 1; // Reset to the first page
    this.updateDisplayedVehicles();
  }




}
