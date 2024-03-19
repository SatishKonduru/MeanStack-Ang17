import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs';
import { productModel } from '../../../../shared/models/model';
import { KidsService } from './kidsService';
import { LoaderService } from '../../../../services/loader.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../../services/snackbar.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';
import { globalProperties } from '../../../../shared/globalProperties';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, FormsModule],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.css'
})
export class KidsComponent implements OnInit{
  dataSource = new MatTableDataSource<productModel[]>();
 
  displayedColumns: string[] = ['name', 'details']
  kidsProducts$! : Observable<productModel[]> 
  kidsService = inject(KidsService)
  loaderService = inject(LoaderService)
  spinnerSize: number = 30;
  searchKey : any;
  private searchTerms = new Subject<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() deleteEmitter = new EventEmitter()
  snackbar = inject(SnackbarService)
  router = inject(Router)
  dialog = inject(MatDialog)
  responseMsg: string = ''
  constructor() { }
  ngOnInit(){
    this.kidsProducts$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(500), // Debounce time of 300ms
      distinctUntilChanged(), // Only emit when the search term changes
      switchMap((searchKey: string) => this.getProducts(searchKey)),
      shareReplay()
    )
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

  updateProduct(item : any){
    this.kidsService.setFormData(item)
    this.router.navigate(['admin/dashboard/products/men'], { queryParams: { openDrawerforKids: true } });
  }
  deleteProduct(product: any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: 'Delete: '+product.name
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    dialogRef.componentInstance.afterDelete.subscribe({
      next: (res: any) =>{
          this.delete(product.id) 
          dialogRef.close()
      }
    })
  }
  delete(id: any){
    this.kidsService.deleteProduct(id).subscribe({
      next: (res: any) => {
        this.getProducts('')   
        if(res?.message){
          this.responseMsg = res?.message
        }
       this.snackbar.openSnackbar(this.responseMsg,'success')
      },
      error: (err: any) => {
        if(err.error?.message){
          this.responseMsg = err.error?.message
        }
        else{
          this.responseMsg = globalProperties.genericError
        }
        this.snackbar.openSnackbar(this.responseMsg,globalProperties.error)
      }
    })
   }
}
