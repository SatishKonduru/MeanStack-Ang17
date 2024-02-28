import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';



const materialComponents: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule
]
@NgModule({
 imports: [materialComponents],
 exports: [materialComponents]
})
export class AngularMaterialModule { }
