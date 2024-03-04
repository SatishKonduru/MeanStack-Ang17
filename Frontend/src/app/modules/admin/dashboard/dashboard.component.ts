import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { jwtDecode } from 'jwt-decode';
import { RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';



interface IMenu {
  route: string,
  name: string, 
  icon : string,
  children?: []
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [
  ]
})
export class DashboardComponent implements OnInit{
payload: any = {}
user: string = ''
menuList$! : Observable<IMenu[]>; 

constructor(private _http: HttpClient){
  
}
ngOnInit(): void {
    const token = sessionStorage.getItem('token')
    if(token){
      this.payload = jwtDecode(token)
      this.user = this.payload.name
    }
    this.menuList$ =  this._http.get<IMenu[]>("../../../../assets/menuItems.json").pipe(shareReplay())
   }
  


}
