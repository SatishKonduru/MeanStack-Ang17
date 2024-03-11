import { Component, OnInit, inject } from "@angular/core";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { Observable, map } from "rxjs";
import { productModel } from "../../../../shared/models/model";
import { MenService } from "./menService";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-men",
  standalone: true,
  imports: [AngularMaterialModule, ProductCardComponent, CommonModule],
  templateUrl: "./men.component.html",
  styleUrl: "./men.component.css",
  providers: [MenService],
})
export class MenComponent implements OnInit {
  menProducts$!: Observable<productModel[]>;
  menService = inject(MenService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const products$ = this.menService.getProducts();
    this.menProducts$ = products$.pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) => product.category.name == "Men"
        );
      })
    );
  }
}
