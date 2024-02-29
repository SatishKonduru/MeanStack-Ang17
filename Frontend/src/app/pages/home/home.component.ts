import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { BrandsComponent } from '../brands/brands.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    BrandsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
