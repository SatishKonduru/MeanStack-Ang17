import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { globalProperties } from '../../shared/globalProperties';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
htmlContent: any;
sanitizer = inject(DomSanitizer)
userService = inject(UserService)
tokenService =inject(TokenAuthService)
responseMsg : any = ''
snackbar = inject(SnackbarService)
router = inject(Router)
dialogRef = inject(MatDialogRef<ProductDetailsComponent>)
constructor(@Inject(MAT_DIALOG_DATA) public dialogData : any){
  const htmlString = dialogData.richDescription;
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(htmlString);
}


addToWishlist(product: any){
  let userId = this.tokenService.getUserId()

  if(userId){
    this.userService.addToWishList(userId, product)
  .subscribe({
    next: (res : any) => {
      if(res?.message)
        this.responseMsg = res?.message
      this.snackbar.openSnackbar(this.responseMsg, 'success')
    },
    error: (err: any) => {
      if(err.error?.message){
        this.responseMsg = err.error?.message
      }
      else{
        this.responseMsg = globalProperties.genericError
      }
      this.snackbar.openSnackbar(this.responseMsg, globalProperties.error)
    }
  })
}
else{}
 
 

}





}

