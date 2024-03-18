import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs';
import { productModel } from '../../../../shared/models/model';
import { KidsService } from './kidsService';
import { LoaderService } from '../../../../services/loader.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, FormsModule],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.css'
})
export class KidsComponent implements OnInit{
  dataSource = new MatTableDataSource<productModel[]>();
  paginatedData: productModel[] = [];
  itemsPerPage = 5; // Number of items per page
  itemsPerPageOptions = [5, 10, 20]; // Options for items per page

  // displayedColumns: string[] = ['name', 'price', 'color', 'countInStock']
  displayedColumns: string[] = ['name', 'details']
  kidsProducts$! : Observable<productModel[]> 
  kidsService = inject(KidsService)
  loaderService = inject(LoaderService)
  spinnerSize: number = 30;
  searchKey : any;
  private searchTerms = new Subject<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor() { }
  ngOnInit(){
    this.kidsProducts$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(500), // Debounce time of 300ms
      distinctUntilChanged(), // Only emit when the search term changes
      switchMap((searchKey: string) => this.getProducts(searchKey))
    ).pipe(shareReplay())
  }


  getProducts(searchKey: string): Observable<any> { // Return type explicitly set to Observable<any>
    return this.kidsProducts$= this.loaderService.showLoader(this.kidsService.getProducts()).pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) =>
            product.category.name == "Kids" &&
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
