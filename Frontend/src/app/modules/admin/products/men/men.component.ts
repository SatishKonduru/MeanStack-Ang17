import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, NgZone, OnInit, ViewChild, inject } from "@angular/core";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { BehaviorSubject, Observable, combineLatest, map, of } from "rxjs";
import { categoryModel, productModel } from "../../../../shared/models/model";
import { MenService } from "./menService";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { MatDrawer } from "@angular/material/sidenav";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { globalProperties } from "../../../../shared/globalProperties";
import { AngularEditorConfig, AngularEditorModule } from "@kolkov/angular-editor";
import { Router } from "@angular/router";

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

  searchKey: string = ''
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
  imageSelected: boolean = false;
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(globalProperties.nameRegx)]],
      description: ['', Validators.required],
      richDescription: [''],
      // image: ['', Validators.required],
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
   
    const imageFile = this.image

    const formData = new FormData();
    formData.append('name', productDetails.name);
    formData.append('description', productDetails.description);
    formData.append('price', productDetails.price);
    formData.append('countInStock', productDetails.countInStock);
    formData.append('category', productDetails.category);
    formData.append('style', productDetails.style);
    formData.append('size', productDetails.size);
    formData.append('color', productDetails.color);
    formData.append('season', productDetails.season);
    formData.append('brand', productDetails.brand);
    formData.append('image', imageFile); 
   
   
    this.menService.addProduct(formData).subscribe((res: any)=> {
      if(res?.message){
        const msg = res?.message
        this.getProducts()
        console.log("Message: ", msg)
     }
    })
  
    this.drawer.close();
    
  }

  closeDrawer(){
    this.drawer.close();
  }
  getProducts(searchKey: string = '') {
    const products$ = this.menService.getProducts();
    this.menProducts$ = products$.pipe(
      map((res: any) => {
        const productArray = res.products || [];
        return productArray.filter(
          (product: any) => product.category.name == "Men" && (product.name.toLowerCase().includes(searchKey.toLowerCase() ) || product.brand.toLowerCase().includes(searchKey.toLowerCase() ) )
        );
      })
    );
    // this.menProducts$.subscribe(res => console.log(res))
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
  image: any;
  onFileSelected(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      this.image = file
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
// Define a BehaviorSubject to hold the search value

  applyFilter(value: any){
    this.getProducts(value);
  }
  onSearchClear(){
    this.searchKey = ''
    this.applyFilter('')
  }
 
}
