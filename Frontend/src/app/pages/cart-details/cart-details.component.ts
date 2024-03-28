import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
  timestamp = Date.now();
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any){}

  updateTotal(product: any) {
    product.total = product.product.price * product.quantity;
    console.log("product.product.price: ", product.product.price)
    console.log("product.quantity: ", product.quantity)
    console.log("Product Total: ", product.total)
}

calculateTotal(product: any) {
    return product.total || (product.product.price * product.quantity);

}


}
