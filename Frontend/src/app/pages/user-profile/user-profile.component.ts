import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenAuthService } from '../../services/tokenAuth.service';
import { Observable, map, shareReplay } from 'rxjs';
import { userModel } from '../../shared/models/model';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { globalProperties } from '../../shared/globalProperties';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})


export class UserProfileComponent implements OnInit{

userId: any;
userToken  = inject(TokenAuthService)
userService = inject(UserService)
userDetails$ !: Observable<userModel>;

private formBuilder = inject(FormBuilder)
snackbar = inject(SnackbarService)
responseMsg: any = ''
userForm !: FormGroup
ngOnInit(): void {
  this.userId =  this.userToken.getUserId()  
  console.log("UserId: in Profle: ", this.userId)
  this.getUserDetails(this.userId)

  this.userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    phone: ['', [Validators.required, Validators.pattern(globalProperties.phoneRegex)]],
    apartment: [''],
    street: [''],
    city: [''],
    state: [''],
    country: ['']
  })
  this.userDetails$.subscribe(res => {
    console.log("Details of USER: ", res)
    this.userForm.patchValue(res)
  })
  
}

getUserDetails(userId: any){
    this.userDetails$ = this.userService.getUserById(userId).pipe(
      map((res: any) =>  res.userDetails),
      shareReplay()
    )
}

@ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild("fileInputField") fileInputField!: ElementRef;
  image: any;
  imageSelected: boolean = false;
  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      this.image = file;
      // Set the selected image preview
      this.previewImage(file);

      // Update the input field value
      this.fileInputField.nativeElement.value = file.name;
      this.imageSelected = true;
    }
  }
  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  selectedFileName: string | undefined;
  selectedImage: string | undefined;
  previewImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }


  updateUser(){
    const userDetails = this.userForm.value;

    const imageFile = this.image;

    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("phone", userDetails.phone);
    formData.append("apartment", userDetails.apartment);
    formData.append("street", userDetails.street);
    formData.append("city", userDetails.city);
    formData.append("state", userDetails.state);
    formData.append("country", userDetails.country);
    
    formData.append("image", imageFile);

  
    this.userService.updateUser(this.userId, formData).subscribe({
      next: (res: any) => {
        if (res?.message) {
          this.responseMsg = res?.message;
          this.getUserDetails(this.userId)
          this.snackbar.openSnackbar(this.responseMsg, "success");
        }
      },

      error: (err: any) => {
         if (err.error?.message) {
            this.responseMsg = err.error?.message;
          } else {
            this.responseMsg = globalProperties.genericError;
          }
          this.snackbar.openSnackbar(this.responseMsg, globalProperties.error);
        }
    });
   
  }

}
