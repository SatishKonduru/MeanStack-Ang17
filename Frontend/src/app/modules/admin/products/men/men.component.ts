import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { Observable, map } from "rxjs";
import { categoryModel, productModel } from "../../../../shared/models/model";
import { MenService } from "./menService";
import { CommonModule } from "@angular/common";
import { MatDrawer } from "@angular/material/sidenav";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { globalProperties } from "../../../../shared/globalProperties";
import { AngularEditorConfig, AngularEditorModule } from "@kolkov/angular-editor";

@Component({
  selector: "app-men",
  standalone: true,
  imports: [AngularMaterialModule, ProductCardComponent, CommonModule, FormsModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: "./men.component.html",
  styleUrl: "./men.component.css",
  providers: [MenService ],
})


export class MenComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

 
  menProducts$!: Observable<productModel[]>;
  menService = inject(MenService);
  categories$!: Observable<categoryModel[]>;
  formBuilder = inject(FormBuilder)
  productForm:any = FormGroup
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '12rem',
    minHeight: '10rem',
    placeholder: 'Enter Product Complete Description here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Poppins'
  }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(globalProperties.nameRegx)]],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      countInStock: [0, Validators.required],
      style: [''],
      size:['', Validators.required],
      color: ['', Validators.required],
      season: ['', Validators.required],
      brand: ['', Validators.required]
    })
  }
  saveProduct() {
    const productDetails = this.productForm.value
    console.log("Product Details: ", productDetails)
    this.menService.addProduct(productDetails).subscribe((res: any)=> {
      if(res?.message){
        const msg = res?.message
        console.log("MEssage: ", msg)
      }
    })
  }

  closeDrawer(){
    this.drawer.close();
  }
  getProducts() {
    const products$ = this.menService.getProducts();
    this.menProducts$ = products$.pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) => product.category.name == "Men"
        );
      })
    );
  }

  getCategories(){
    const category$ = this.menService.getCategories();
    this.categories$ = category$.pipe(
     map((res: any) => {
      const categoryArray = res.categories || []
      return categoryArray
     })
      )
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInputField') fileInputField!: ElementRef;
  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Set the selected image preview
      this.previewImage(file);

      // Update the input field value
      this.fileInputField.nativeElement.value = file.name;
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
}
