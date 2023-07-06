import { BrandService } from './../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  public brandProperty: FormGroup;

  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private route:Router) {
    this.brandProperty = this.formBuilder.group({
      brandName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]]
    })
   }

  ngOnInit(): void {

  }

  submitBrand(){
    console.log("Submitted");
    console.log( this.brandProperty.value);
    this.brandService.registeringBrand(this.brandProperty.value).subscribe(res=>{
      console.log(res);
      this.route.navigate(['admin/managebrand'])
    })
  }

}
