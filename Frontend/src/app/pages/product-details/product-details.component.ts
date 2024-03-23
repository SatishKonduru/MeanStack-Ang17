import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

constructor(@Inject(MAT_DIALOG_DATA) public dialogData : any){
  const htmlString = dialogData.richDescription;
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(htmlString);
}
}
