import { Component, OnInit, inject } from '@angular/core';
import { MenService } from '../../modules/admin/products/men/menService';
import { Observable, map } from 'rxjs';
import { productModel } from '../../shared/models/model';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { LoaderService } from '../../services/loader.service';

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
prodcut: any;
  ngOnInit(): void {
      this.getProducts()
  }
  getProducts() {
    const products$ = this.menService.getProducts()
    products$.subscribe(res => console.log(res))
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
  

}
