import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { globalProperties } from '../../shared/globalProperties';
import { jwtDecode } from 'jwt-decode';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AngularMaterialModule, 
    FormsModule,
    ReactiveFormsModule,
    RegisterComponent,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    UserService,
    SnackbarService,
    TokenAuthService
  ]
})
export class LoginComponent implements OnInit {
loginForm : any = FormGroup
responseMsg: string = ''
payload: any = {}
timestamp = Date.now();
constructor(
  private _formBuilder: FormBuilder, 
  private _userService: UserService,
  private _snackbar: SnackbarService,
  private _router: Router,
  private _tokenAuthService: TokenAuthService
){}
ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [''],
      password: ['']
    })
}

onLogin(){
  const data = this.loginForm.value
  this._userService.userLogin(data)
  .subscribe({
    next: (res: any) => {
      const token = res?.token
      // sessionStorage.setItem('token', token)
      this._tokenAuthService.setToken(token)
      this.payload = jwtDecode(token)
      // console.log("Role: ", this.payload.role)
      if(this.payload.role && this.payload.role === 'admin')
        this._router.navigate(['/admin/dashboard'])
      else
        this._router.navigate(['/'])
    },
    error: (err: any) => {
      console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", err)
      if(err.error?.message){
        this.responseMsg = err.error?.message
      }
      else{
        this.responseMsg = globalProperties.genericError
      }
      this._snackbar.openSnackbar(this.responseMsg, 'error')
    }
  })
}



}
