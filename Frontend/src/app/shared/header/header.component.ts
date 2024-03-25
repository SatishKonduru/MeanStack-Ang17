import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AngularMaterialModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [
    TokenAuthService
  ]
})
export class HeaderComponent implements  AfterViewChecked{

userToken$ !: Observable<string>

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



}
