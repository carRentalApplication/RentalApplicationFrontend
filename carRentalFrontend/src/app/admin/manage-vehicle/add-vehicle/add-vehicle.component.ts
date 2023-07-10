import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from './../../../services/vehicle.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { Brand } from 'src/app/model/Brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';
import { Rent } from 'src/app/model/Rent.model';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']


})
export class AddVehicleComponent implements OnInit {

  brandDetailsBackend: Brand[] = [] //showing all brands

  rentDetails:Rent[]=[]
  

  editing: boolean = false;

  constructor(private vehicleService: VehicleService,
    private http: HttpClient, private route: ActivatedRoute,
    private brandService: BrandService,
    private router: Router,
    private formBuilder: FormBuilder) { }


  addVehicleDetails!: FormGroup

  ngOnInit(): void {

    this.brandService.getAllBrands().subscribe(res => {
      console.log(res);
      this.brandDetailsBackend = res;
    });


    this.addVehicleDetails = this.formBuilder.group({
      vehicleName: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      seatingCapacity: ['', Validators.required],
      fuelType: ['', Validators.required],
      brand: this.formBuilder.group({
        brandName: ['']
      }),
      rent: this.formBuilder.group({
        rentAmount: ['']
      }),
      VehicleImage: this.formBuilder.group({
        imageUrl: ['']
      })
    });

  }
  onSubmit() {
    console.log("trigger");
    console.log(this.addVehicleDetails.value);


    if (this.addVehicleDetails.valid) {
      console.log(this.addVehicleDetails.value);
      // this.addVehicleDetails.reset();
    }

  }
}

