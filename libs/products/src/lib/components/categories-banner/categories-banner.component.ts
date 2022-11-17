 import { Subject } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
 @Component({
  selector: 'eshop-products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit,OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService
    .getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.categories = categories;
    });
  }
  ngOnDestroy() {
    this.endSubs$.next(void 0);
    this.endSubs$.complete();
  }
}
