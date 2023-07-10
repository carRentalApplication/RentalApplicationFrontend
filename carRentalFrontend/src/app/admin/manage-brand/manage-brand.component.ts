import { Brand } from 'src/app/model/Brand.model';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.scss']
})
export class ManageBrandComponent implements OnInit {

  constructor(private brandService:BrandService,private toster:ToastrService) { }

    //for pagination
    currentPage: number = 1;
    pageSize: number = 4;
    totalItems: number = 0;
    totalPages: number = 0;

  public brandData: Brand[] =[]

  ngOnInit(): void {
    this.getAllBrand()
  }

  getAllBrand(){
    this.brandService.getAllBrands().subscribe(res=>{
      console.log(res);
      this.brandData=res;
    })
  }

  //for pagination methods start
  // changePage(pageNumber: number) {
  //   if (pageNumber >= 1 && pageNumber <= this.totalPages) {
  //     this.currentPage = pageNumber;
  //   }
  // }

  //  getCurrentPageProducts(): Brand[] {
  //   this.getAllBrand();
  //   this.totalItems = this.brandData.length;
  //   this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   return this.brandData.slice(startIndex, endIndex);
  //  }
  //for oagination method ends


}
