import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs';
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
  responseMsg: string = ''
  womenService = inject(WomenService)
  loaderService = inject(LoaderService)
  @ViewChild(MatPaginator) paginator! : MatPaginator
  private searchTerms = new Subject<string>();
  spinnerSize: number = 30;
  showItemDetails(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }
  onClose(){
    this.selectedItem = null;
    this.showDetails = false;
  }

  ngOnInit(): void {
      // this.getProducts()
      this.womenProducts$ = this.searchTerms.pipe(
        startWith(''),
        debounceTime(500), // Debounce time of 300ms
        distinctUntilChanged(), // Only emit when the search term changes
        switchMap((searchKey: string) => this.getProducts(searchKey))
      ).pipe(shareReplay())
  
      // Fetch products on component initialization without search key
      this.searchTerms.next('');
  }

  getProducts(searchKey: string): Observable<any> { // Return type explicitly set to Observable<any>
    return this.loaderService.showLoader(this.womenService.getProducts()).pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) =>
            product.category.name == "Women" &&
            (product.name
              .trim()
              .toLowerCase()
              .includes(searchKey.trim().toLowerCase()) ||
              product.color
                .trim()
                .toLowerCase()
                .includes(searchKey.trim().toLowerCase()))
        );
      })
    );
  }

  applyFilter(value: any) {
    // this.getProducts(value);
    this.searchTerms.next(value);
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter("");
  }
}
