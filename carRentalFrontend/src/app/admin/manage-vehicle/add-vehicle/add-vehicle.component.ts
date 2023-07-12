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
      let vid=parseInt(id!)
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
    console.log("submit");

    if (this.addVehicleForm.valid) {
      console.log(this.vehicle instanceof Vehicle);
    console.log("Submitted");
    console.log(this.addVehicleForm.value);
    var formValues=this.addVehicleForm.value;

   this.vehicle.vehicleName=this.addVehicleForm.get('vehiclename')?.value ?? ""
    this.vehicle.vehicleNumber=this.addVehicleForm.get('vehiclenumber')?.value ?? ''
    this.vehicle.fuelType=this.addVehicleForm.get('fueltype')?.value!

    var brand=new Brand()
    brand.brandName=this.addVehicleForm.get('branddetails')?.value ?? ''
    this.vehicle.brand=brand
    var rent=new Rent()
    rent.rentAmount=parseInt(this.addVehicleForm.get('rentdetails')?.value!)
    this.vehicle.rent=rent
    this.vehicle.seatingCapacity=parseInt(this.addVehicleForm.get('seatingcapacity')?.value!)
    this.vehicle=this.vehicle as Vehicle

    var vehImg:VehicleImages[]=[]
  //  var vehImg1:VehicleImages=new VehicleImages()
  vehImg.push( new VehicleImages().imageUrl=this.addVehicleForm.get('image1')?.value!)
  vehImg.push( new VehicleImages().imageUrl=this.addVehicleForm.get('image2')?.value!)
  vehImg.push( new VehicleImages().imageUrl=this.addVehicleForm.get('image3')?.value!)


  //  vehImg[0]=vehImg1
  //  vehImg.push(vehImg1)
  //  console.log(vehImg[0].imageUrl);


  //  vehImg1.imageUrl=this.addVehicleForm.get('image2')?.value!
  //  vehImg[1]=vehImg1
  //  vehImg1.imageUrl=this.addVehicleForm.get('image3')?.value!
  //  vehImg[2]=vehImg1
 for(let i of vehImg)
 {
  console.log(i.imageUrl);
 }

   this.vehicle.vehicleImages=this.vehicle.vehicleImages?.concat(vehImg)

   console.log(this.vehicle.vehicleImages);

    // this.vehicleService.registeringVehicle(this.vehicle).subscribe(res=>{
    // console.log(res);
    //  this.router.navigate(['admin/managevehicle'])
    // })
  }
}

  update() {
    if (this.addVehicleForm.valid) {
      this.vehicle = this.getFormValues();
      this.vehicleService.updateVehicle(this.vehicle.vehicleId,this.vehicle).subscribe(res => {
        console.log(res);
        this.router.navigate(['admin/manageVehicle'])
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
        brandId:this.vehicle.brand?.brandId,
        brandName: formValues.branddetails
      },
      rent: {
        rentId:this.vehicle.rent?.rentId,
        rentAmount: formValues.rentdetails
      },
      vehicleImages: [
         formValues.image1 ,
         formValues.image2 ,
         formValues.image3
      ]
    };
    console.log(vehicle);
    return vehicle;
  }
}
