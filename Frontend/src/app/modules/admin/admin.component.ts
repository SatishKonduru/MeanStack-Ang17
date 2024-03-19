import { Component } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenAuthService } from '../../services/tokenAuth.service';

interface IMenu {
  route: string,
  name: string, 
  icon : string,
  children?: []
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  menuList$! : Observable<IMenu[]>; 
  userToken$ !: Observable<string>
  
  constructor(private _http: HttpClient, private _tokenAuth: TokenAuthService){
    
  }
  ngOnInit(): void {
    this.userToken$ =  this._tokenAuth.getToken()
    this.menuList$ =  this._http.get<IMenu[]>("../../../../assets/menuItems.json")
     }
    
}
