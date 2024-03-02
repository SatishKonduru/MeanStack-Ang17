import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { globalProperties } from '../../shared/globalProperties';

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
        name: ['', [Validators.required, Validators.pattern(globalProperties.nameRegx)]],
        email: ['', [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
        password:['', [Validators.required]],
        phone: ['', [Validators.required, Validators.maxLength(10)]],
        apartment: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
        country: ['']
      })
  }

  onRegister(){
    
  }
}
