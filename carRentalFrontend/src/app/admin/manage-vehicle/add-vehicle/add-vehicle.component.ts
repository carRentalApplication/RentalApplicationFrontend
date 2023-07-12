import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/model/Brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { Vehicle } from 'src/app/model/Vehicle.model';
import { Rent } from 'src/app/model/Rent.model';
import { VehicleImages } from 'src/app/model/VehicleImages.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  editable: boolean = false;
  brandDetailsBackend: Brand[] = [];
  vehicle: Vehicle = new Vehicle();
  addVehicleForm: FormGroup;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private router: Router
  ) {
    this.addVehicleForm = new FormGroup({
      vehiclename: new FormControl('', Validators.required),
      vehiclenumber: new FormControl('', Validators.required),
      seatingcapacity: new FormControl('', Validators.required),
      fueltype: new FormControl('', Validators.required),
      branddetails: new FormControl('', Validators.required),
      rentdetails: new FormControl('', Validators.required),
      image1: new FormControl(''),
      image2: new FormControl(''),
      image3: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe(res => {
      this.brandDetailsBackend = res;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      let vid = parseInt(id!);
      if (id) {
        this.editable = true;
        this.vehicleService.getVehicle(vid).subscribe(vehicle => {
          if (vehicle) {
            this.vehicle = vehicle;
            this.patchFormValues();
          }
        });
      }
    });
  }

  patchFormValues() {
    if (this.vehicle && this.vehicle.vehicleImages && this.vehicle.vehicleImages.length > 0) {
      this.addVehicleForm.patchValue({
        vehiclename: this.vehicle.vehicleName,
        vehiclenumber: this.vehicle.vehicleNumber,
        seatingcapacity: this.vehicle.seatingCapacity,
        fueltype: this.vehicle.fuelType,
        branddetails: this.vehicle.brand?.brandName,
        rentdetails: this.vehicle.rent?.rentAmount,

        image1: this.vehicle.vehicleImages[0]?.imageUrl,
        image2: this.vehicle.vehicleImages[1]?.imageUrl,
        image3: this.vehicle.vehicleImages[2]?.imageUrl
      });
    }
  }

  submitVehicle() {

    if (this.addVehicleForm.valid) {
      this.vehicle = this.getFormValues();

      var vehImg: VehicleImages[] = [];

      var image1Url = this.addVehicleForm.get('image1')?.value;
      if (image1Url) {
        var image1 = new VehicleImages();
        image1.imageUrl = image1Url;
        vehImg.push(image1);
      }

      var image2Url = this.addVehicleForm.get('image2')?.value;
      if (image2Url) {
        var image2 = new VehicleImages();
        image2.imageUrl = image2Url;
        vehImg.push(image2);
      }

      var image3Url = this.addVehicleForm.get('image3')?.value;
      if (image3Url) {
        var image3 = new VehicleImages();
        image3.imageUrl = image3Url;
        vehImg.push(image3);
      }

      this.vehicle.vehicleImages = vehImg;

      console.log(this.vehicle);

      // this.vehicleService.registeringVehicle(this.vehicle).subscribe(res=>{
      // console.log(res);
      //  this.router.navigate(['admin/managevehicle'])
      // })
      this.vehicleService.registeringVehicle(this.vehicle).subscribe(res=>{
        console.log(res);
        this.router.navigate(['/admin/managevehicle'])
    })
  }
  }

  update() {
    if (this.addVehicleForm.valid) {

      this.vehicle=this.getFormValues()
      console.log(this.vehicle,"/nupdate");
      this.vehicleService.updateVehicle(this.vehicle.vehicleId, this.vehicle).subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/managevehicle']);
      });
    }
  }

  getFormValues(): Vehicle {
    console.log("formget");

    const formValues = this.addVehicleForm.value;
    const vehicle: Vehicle = {
      vehicleId: this.vehicle.vehicleId,
      vehicleName: formValues.vehiclename,
      vehicleNumber: formValues.vehiclenumber,
      seatingCapacity: formValues.seatingcapacity,
      fuelType: formValues.fueltype,
      brand: {
        brandId: this.vehicle.brand?.brandId,
        brandName: formValues.branddetails
      },


      rent: {
        rentId: this.vehicle.rent?.rentId,
        rentAmount: formValues.rentdetails
      },
      vehicleImages: []
    };

    console.log(vehicle,formValues.rentdetails);
    return vehicle;
  }
}
