import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, Input, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { productModel } from '../../../../shared/models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent{
@Input() products: any;


}
