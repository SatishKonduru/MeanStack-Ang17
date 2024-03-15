import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { productModel } from '../../../../shared/models/model';
import { CommonModule } from '@angular/common';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MenService } from '../../products/men/menService';
import { globalProperties } from '../../../../shared/globalProperties';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, ConfirmationComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent{
@Input() products: any;
@Input() menDrawer!: any;

@Output() menDrawerContentTitle = new EventEmitter()
@Output() menDrawerFormData = new EventEmitter()
@Output() deleteEmitter = new EventEmitter()

userDialog = inject(MatDialog)
menService = inject(MenService)
snackbar = inject(SnackbarService)
responseMsg: string = ''


  toggleMenDrawer(product : any) {
    this.menDrawer.toggleDrawer();
    this.menDrawerContentTitle.emit('Update Product') 
    this.menDrawerFormData.emit( product)
    console.log("Emitting Product Data: ", product)
   }

   deleteProduct(product:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: 'Delete: '+product.name
    }
    const dialogRef = this.userDialog.open(ConfirmationComponent, dialogConfig)
    dialogRef.componentInstance.onEmitStatusChange.subscribe({
      next: (res: any) =>{
          this.delete(product.id)    
          
          dialogRef.close()
      }
    })
   }

   delete(id: any){
    this.menService.deleteProduct(id).subscribe({
      next: (res: any) => {
        if(res?.message){
          this.responseMsg = res?.message
        }
        this.deleteEmitter.emit()
        this.snackbar.openSnackbar(this.responseMsg,'success')
      },
      error: (err: any) => {
        if(err.error?.message){
          this.responseMsg = err.error?.message
        }
        else{
          this.responseMsg = globalProperties.genericError
        }
        this.snackbar.openSnackbar(this.responseMsg,globalProperties.error)
      }
    })
   }

}
