import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartDetailsComponent } from '../cart-details/cart-details.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit, AfterViewInit{
  isOpen: boolean = false;
  cartService = inject(CartService)
  userId : any;
  userToken = inject(TokenAuthService)
  cartItems$ !: Observable<any>
  cartDetails: any = []
  dialog = inject (MatDialog)
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
  ngAfterViewInit(): void {
    // this.cartService.notifyProductAdded();
    // this.getCartItems()
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
  const dialogConfig = new MatDialogConfig()
  dialogConfig.data = {
    data: this.cartDetails
  }
  dialogConfig.width = '90%'
  dialogConfig.height = '600px'
  dialogConfig.disableClose = true
  dialogConfig.autoFocus = true
  this.dialog.open(CartDetailsComponent, dialogConfig)
 }
 

}
