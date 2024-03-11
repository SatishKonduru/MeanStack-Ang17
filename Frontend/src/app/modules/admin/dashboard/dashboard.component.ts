import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { jwtDecode } from 'jwt-decode';
import { RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from '../../../services/tokenAuth.service';



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
    TokenAuthService
  ]
})
export class DashboardComponent implements OnInit{

menuList$! : Observable<IMenu[]>; 
userToken$ !: Observable<string>

constructor(private _http: HttpClient, private _tokenAuth: TokenAuthService){
  
}
ngOnInit(): void {
  this.userToken$ =  this._tokenAuth.getToken()
  this.menuList$ =  this._http.get<IMenu[]>("../../../../assets/menuItems.json")
   }
  


}
