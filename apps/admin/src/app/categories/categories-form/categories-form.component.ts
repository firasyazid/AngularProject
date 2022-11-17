import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { CategoriesService, Category } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
  
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted  = false; 
  editmode=false; 
  currentCategoryID: string | undefined;

   constructor(private messageService : MessageService ,
    private formBuilder: FormBuilder ,
     private categoriesService: CategoriesService, 
     private location: Location,
     private route : ActivatedRoute,
     ) {} 

  ngOnInit(): void {


  this.form=this.formBuilder.group({
    name: ['', Validators.required],
    icon: ['', Validators.required],
    color: ['#fff'],



});
this._checkEditMode() ; 

  }

  onSubmit(){ 

    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id : this.currentCategoryID,
     name : this.categoryForm['name'].value,
     icon : this.categoryForm['icon'].value,
     color : this.categoryForm['color'].value,


      }

      if (this.editmode) {
        this._updateCategory(category)
      } else {
        this._addCategory(category)
      }
 
  }
  
  onCancle() {
    this.location.back();
  }

   
  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created!`
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
          detail: 'Category is not created!'
        });
      }
    );
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated!'
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
          detail: 'Category is not updated!'
        });
      }
    );
  }


  private _checkEditMode(){ 
this.route.params.subscribe(params =>{ 

if (params['id']){ 
this.editmode=true;
this.currentCategoryID= params['id'];
this.categoriesService.getCategory(params['id']).subscribe(category => {
  this.categoryForm['name'].setValue(category.name) ; 
  this.categoryForm['icon'].setValue(category.icon) ; 
  this.categoryForm['color'].setValue(category.color) ; 




}

  )

}

  
})

  }


    
  get categoryForm () { 

return this.form.controls;
}
}
  
