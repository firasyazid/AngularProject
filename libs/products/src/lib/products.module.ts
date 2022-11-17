import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
 import { ProductsItemComponent } from './components/products-item/products-item.component';
import { FeaturedItemComponent } from './components/featured-item/featured-item.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiModule } from '@eshop/ui';
import { FlashItemComponent } from './components/flash-item/flash-item.component';


const routes : Routes = [ 
{ 

  path: 'products', 
  component: ProductsListComponent,
}, 
{ 

  path: 'category/:categoryid', 
  component: ProductsListComponent,
}, 
{
path: 'products/:productid', 
component: ProductPageComponent,
}, 

]
@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes),ButtonModule,
    CheckboxModule,FormsModule,ReactiveFormsModule,RatingModule,InputNumberModule,UiModule],
    
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
     ProductsItemComponent,
     FeaturedItemComponent,
     ProductsListComponent,
     ProductPageComponent,
     FlashItemComponent,

    
     
  ],
  exports:[ProductsSearchComponent, CategoriesBannerComponent, ProductsItemComponent, FeaturedItemComponent, ProductsListComponent, ProductPageComponent, FlashItemComponent]
})
export class ProductsModule {}
