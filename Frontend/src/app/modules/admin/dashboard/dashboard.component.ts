import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { jwtDecode } from 'jwt-decode';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
payload: any = {}
user: string = ''

ngOnInit(): void {
    const token = sessionStorage.getItem('token')
    if(token){
      this.payload = jwtDecode(token)
      this.user = this.payload.name
    }
    

}
}
