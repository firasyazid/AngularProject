import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  import { CartItemsDetailed } from '../../models/cart';
 import { CartService } from '../../services/cart/cart.service';
import { OrdersService } from '../../services/cart/order.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed : CartItemsDetailed[] = [] ;  
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  
  constructor(private router : Router,  private cartService: CartService, private ordersService:OrdersService,
     ) {}
     ngOnDestroy() {
      this.endSubs$.next(0);
      this.endSubs$.complete();
    }
  

  ngOnInit(): void {
    this._getCartDetails();
  }


  
  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((respCart) => {
      this.cartItemsDetailed= [];
      this.cartCount = respCart?.items.length ?? 0;

    respCart.items.forEach((cartItem) => {
 this.ordersService.getProduct(cartItem.productId).subscribe(respProduct => { 
  this.cartItemsDetailed.push({
    product: respProduct,
    quantity: cartItem.quantity
  });
})
  });
});
}



  backToShop(){

this.router.navigate(['/products']) ; 

  }

  deleteCartItem(cartItem: CartItemsDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }


  updateCartItemQuantity(event, cartItem: CartItemsDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }
}


