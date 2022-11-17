import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'eshop-featured-item',
  templateUrl: './featured-item.component.html',
  styles: [
  ]
})
export class FeaturedItemComponent implements OnInit {
  featuredProducts: Product[] = [];


  constructor(private prodService : ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();

  }
  private _getFeaturedProducts() {
    this.prodService
      .getFeaturedProducts(4)
        .subscribe((products) => {
        this.featuredProducts = products;
      });
  }
}
