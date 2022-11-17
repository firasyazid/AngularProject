import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'eshop-flash-item',
  templateUrl: './flash-item.component.html',
  styles: [
  ]
})
export class FlashItemComponent implements OnInit {

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
