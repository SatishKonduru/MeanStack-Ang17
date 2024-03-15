import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
@Input() parentDrawer!: any;

@Output() drawerContentTitle = new EventEmitter()
@Output() drawerFormData = new EventEmitter()

  toggleParentDrawer(product : any) {
    this.parentDrawer.toggleDrawer();
    this.drawerContentTitle.emit('Edit Product') 
    this.drawerFormData.emit( product)
    console.log("Selected Product Details: ", product)
    

  }

}
