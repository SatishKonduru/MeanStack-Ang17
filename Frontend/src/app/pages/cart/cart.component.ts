import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit{
  isOpen: boolean = false;
  cartService = inject(CartService)
  ngOnInit(): void {
    this.cartService.isCartOpen().subscribe(open => {
      this.isOpen = open;
    });
  }
  closeCart(): void {
    this.cartService.toggleCart();
  }
}
