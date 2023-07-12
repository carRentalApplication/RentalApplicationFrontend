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

  constructor(private brandService: BrandService, private toster: ToastrService) {
    this.getAllBrand();
    this.getCurrentPageProducts();
  }

  //for pagination
  currentPage: number = 1;
  pageSize: number = 4;
  totalItems: number = 0;
  totalPages: number = 0;

  public brandData: Brand[] = []

  public dataSource:any;
  ngOnInit(): void {}

  getAllBrand() {
    this.brandService.getAllBrands().subscribe(res => {
      this.brandData = res;
      console.log(this.brandData.length);
    })
  }

  // for pagination methods start
  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
  getCurrentPageProducts(): Brand[] {
    console.log(this.brandData.length);
    this.totalItems = this.brandData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    console.log(this.brandData.slice(startIndex, endIndex));
    return this.brandData.slice(startIndex, endIndex);
  }
  //for oagination method ends


  //filter

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchText:any;

}
