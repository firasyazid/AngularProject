import { Component, Input, OnInit } from '@angular/core';
 import { CartItem, CartService } from '@eshop/orders';
  import { Product } from '../../models/product';

@Component({
  selector: 'eshop-products-item',
  templateUrl: './products-item.component.html',
  styles: [
  ]
})
export class ProductsItemComponent implements OnInit {
  @Input() product: Product | undefined;


  constructor( private cartService : CartService) { }

  ngOnInit(): void {
  }


  addProductToCart() {
    const cartItem: CartItem = { 
      productId: this.product?.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
}
