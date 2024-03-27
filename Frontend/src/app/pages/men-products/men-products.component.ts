import { Component, OnInit, inject } from '@angular/core';
import { MenService } from '../../modules/admin/products/men/menService';
import { Observable, map } from 'rxjs';
import { productModel } from '../../shared/models/model';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { LoaderService } from '../../services/loader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-men-products',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './men-products.component.html',
  styleUrl: './men-products.component.css'
})
export class MenProductsComponent implements OnInit{
  timestamp = Date.now();
  menService = inject(MenService)
  menProducts$!: Observable<productModel[]>;
  loaderService = inject(LoaderService);
  spinnerSize: number = 30;
  dialog = inject(MatDialog)
  ngOnInit(): void {
      this.getProducts()
  }
  getProducts() {
    const products$ = this.menService.getProducts()
    const loadProducts$ = this.loaderService.showLoader(products$);
    this.menProducts$ = loadProducts$.pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) =>
            product.category.name == "Men"
          );
      })
    );
  }
  
  openProductDetails(product: any){
    console.log("Product Details: ", product)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = product
    dialogConfig.width = '940px'
    dialogConfig.position = {left:'10px'}
    dialogConfig.autoFocus = true
    dialogConfig.disableClose = true
    this.dialog.open(ProductDetailsComponent, dialogConfig)
  }

}
