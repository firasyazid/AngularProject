 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService , Category, Product, ProductsService} from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';



@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editmode = false;
  form!: FormGroup;
  isSubmitted  = false; 
  catagories: Category[] = [];
  imageDisplay!: string | ArrayBuffer;
  currentProductId!: string;

   

  constructor(   private formBuilder: FormBuilder ,private router: Router, 
    private categoriesService : CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,


    ) { 
    
  }

  ngOnInit(): void {

    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }


  private _initForm() { 

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
       isFeatured: [false]
    });

  }
  get productForm() {
    return this.form.controls;
  }
 
  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
       const fileReader = new FileReader();
      fileReader.onload = () => {
         this.imageDisplay != fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

   
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.catagories = categories;
    });
  }


  onSubmit() {
  this.isSubmitted = true;
  if (this.form.invalid) return;

  const productFormData = new FormData();
  Object.keys(this.productForm).map((key) => {
    productFormData.append(key, this.productForm[key].value);
  });

  if (this.editmode) {
    this._updateProduct(productFormData);
  } else {
    this._addProduct(productFormData);
  }


}
 
 
private _addProduct(productData: FormData) {
  this.productsService.createProduct(productData).subscribe(
    (product: Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product ${product.name} is created!`
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not created!'
      });
    }
  );
}

private _updateProduct(productFormData: FormData) {
  this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
    () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product is updated!'
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not updated!'
      });
    }
  );
}


private _checkEditMode() {
  this.route.params.subscribe((params) => {
    if (params['id'] ){
      this.editmode = true;
      this.currentProductId = params['id'];
      this.productsService.getProduct(params['id']).subscribe((product) => {
        this.productForm['name'].setValue(product.name);
        this.productForm['category'].setValue(product.category?.id);
        this.productForm['brand'].setValue(product.brand);
        this.productForm['price'].setValue(product.price);
        this.productForm['countInStock'].setValue(product.countInStock);
        this.productForm['isFeatured'].setValue(product.isFeatured);
        this.productForm['description'].setValue(product.description);
        this.productForm['richDescription'].setValue(product.richDescription);
        this.imageDisplay != product.image;
        this.productForm['image'].setValidators([]);
        this.productForm['image'].updateValueAndValidity();

       });
    }
  });
}

 }

