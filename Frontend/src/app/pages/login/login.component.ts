import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { globalProperties } from '../../shared/globalProperties';

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
    SnackbarService
  ]
})
export class LoginComponent implements OnInit {
loginForm : any = FormGroup
responseMsg: string = ''
constructor(
  private _formBuilder: FormBuilder, 
  private _userService: UserService,
  private _snackbar: SnackbarService,
  private _router: Router
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
      sessionStorage.setItem('token', token)
      // this._router.navigate(['/admin/dashboard'])
    },
    error: (err: any) => {
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
