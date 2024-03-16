import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { Observable, map } from 'rxjs';
import { productModel } from '../../../../shared/models/model';
import { WomenService } from './womenService';
import { LoaderService } from '../../../../services/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent implements OnInit{
  
  selectedItem: any;
  showDetails: boolean = false;
  searchKey: any ;
  displayedColumns: string[] = ['name', 'price', 'color', 'countInStock']
  womenProducts$! : Observable<productModel[]> 
  dataSource: any;
  responseMsg: string = ''
  womenService = inject(WomenService)
  loaderService = inject(LoaderService)
  @ViewChild(MatPaginator) paginator! : MatPaginator
  showItemDetails(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }
  onClose(){
    this.selectedItem = null;
    this.showDetails = false;
  }

  ngOnInit(): void {
      this.getProducts()
  }

  getProducts(): void {
    const products$ = this.womenService.getProducts();
    const loadProducts$ = this.loaderService.showLoader(products$);
    this.womenProducts$ = loadProducts$.pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) =>
            product.category.name == "Women" 
        );
      })

    );

    this.womenProducts$.subscribe(products => {
      console.log("Women Products : ", products)
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator
    });
  }

  applyFilter(searchValue: any){
    this.dataSource.filter = searchValue.trim().toLowerCase()
  }
  onSearchClear(){
    this.searchKey = ''
    this.applyFilter('')
  }
}
