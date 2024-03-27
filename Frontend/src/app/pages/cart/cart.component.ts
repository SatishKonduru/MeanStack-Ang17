import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { Observable, map, shareReplay, tap } from 'rxjs';

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
  userId : any;
  userToken = inject(TokenAuthService)
  cartItems$ !: Observable<any>
  cartDetails: any = []
  ngOnInit(): void {
    this.cartService.isCartOpen().subscribe(open => {
      this.isOpen = open;
    });
  this.userId = this.userToken.getUserId()
   this.getCartItems()
  this.cartService.productAdded$.subscribe(() => {
    // Refresh cart data when notified that a product has been added
    this.getCartItems();
  });

  }
  closeCart(): void {
    this.cartService.toggleCart();
  }

  getCartItems(){
  this.cartItems$ = this.cartService.getCartItems(this.userId).pipe(
      map(item => {
         if(item.cart.status == 'Active'){
          return item.cart
        }
      }),
      shareReplay()
    )
 }

 openCartDetails(){
 this.cartItems$.subscribe(res => this.cartDetails =res)
  console.log("Cart Details for Full View:", this.cartDetails)
 }
 

}
