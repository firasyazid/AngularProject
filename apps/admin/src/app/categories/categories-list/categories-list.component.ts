import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@eshop/products';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];





  constructor(private categoriesService : CategoriesService,
             private messageService : MessageService,
            private router: Router
    ) { }
  ngOnInit(): void {
    this._getCategories() ; 
  }

  deleteCategory(categoryId: string) {




    

this.categoriesService.deleteCategory(categoryId).subscribe( () => { 
  this._getCategories();
  this.messageService.add({severity:'success', summary:' success', detail:'Category deleted'});

});
}


updateCategory(categoryid: string) {
  this.router.navigateByUrl(`categories/form/${categoryid}`);
}


private _getCategories() {
this.categoriesService.getCategories().subscribe(cats => { 

  this.categories=cats ; 


 }); 
}}
