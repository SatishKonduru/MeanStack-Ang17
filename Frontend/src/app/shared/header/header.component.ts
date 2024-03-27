import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, OnInit, inject } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CartComponent } from '../../pages/cart/cart.component';
import { CartService } from '../../services/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { globalProperties } from '../globalProperties';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule,
    CommonModule,
    CartComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [
    TokenAuthService
  ]
})
export class HeaderComponent implements  AfterViewChecked{

userToken$ !: Observable<string>
cartService = inject(CartService)
responseMsg : any = ''
snackbar = inject(SnackbarService)
constructor(private _router: Router, private _tokenAuth: TokenAuthService, private cdr: ChangeDetectorRef, private userService: UserService){

}


ngAfterViewChecked(): void {
  this.userToken$ = this._tokenAuth.getToken()
  // this.userToken$ = this._tokenAuth.token$;
  this.cdr.detectChanges();

}

onExit(){
  this._tokenAuth.exit();
  this._router.navigate(['/']);
}

openCart(): void {
  const token = sessionStorage.getItem('token')
  if(!token){
      this.responseMsg = 'Please login '
      this.snackbar.openSnackbar(this.responseMsg, globalProperties.error)
  }
  else{
    this.cartService.toggleCart();
  }
  
  }
 
 

}
