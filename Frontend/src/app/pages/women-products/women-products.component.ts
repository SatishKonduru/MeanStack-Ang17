import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { MenService } from '../../modules/admin/products/men/menService';
import { Observable, map } from 'rxjs';
import { productModel } from '../../shared/models/model';
import { LoaderService } from '../../services/loader.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-women-products',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './women-products.component.html',
  styleUrl: './women-products.component.css'
})
export class WomenProductsComponent implements OnInit{
  timestamp = Date.now();
  menService = inject(MenService)
  womenProducts$!: Observable<productModel[]>;
  loaderService = inject(LoaderService);
  spinnerSize: number = 30;
  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.getProducts()
}
getProducts() {
  const products$ = this.menService.getProducts()
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
}

openProductDetails(product: any){
  console.log("Product Details: ", product)
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = product
  dialogConfig.width = '1024px'
  dialogConfig.autoFocus = true
  dialogConfig.disableClose = true
  this.dialog.open(ProductDetailsComponent, dialogConfig)
}

}
