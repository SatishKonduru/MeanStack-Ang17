import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
loginForm : any = FormGroup
constructor(
  private _formBuilder: FormBuilder
){}
ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [''],
      password: ['']
    })
}
}
