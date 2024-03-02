import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm : any = FormGroup
  constructor(
    private _formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
      this.registerForm = this._formBuilder.group({
        name: [''],
        email: [''],
        password:[''],
        phone: [''],
        apartment: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
        country: ['']
      })
  }
}
