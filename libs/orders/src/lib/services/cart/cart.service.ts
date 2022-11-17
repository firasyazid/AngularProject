import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: []
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem('cart', intialCartJson);
    }
  }

    getCart(): Cart {
      const cartJsonString: string = localStorage.getItem('cart')|| '{}';
      const cart: Cart = JSON.parse(cartJsonString);
      return cart;
    }

    setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart {
const cart= this.getCart();
const cartItemExist =cart.items?.find((item) => item.productId === cartItem.productId);
if (cartItemExist) {
  cart.items.map((item) => {
    if (item.productId === cartItem.productId) {
      if (updateCartItem) {
        item.quantity = cartItem.quantity;
      } else {
        item.quantity = item.quantity + cartItem.quantity;
      }

      return item;
    }   else {
    console.log('Correct');
    return true;
  }
  
   
});


   } else {


cart.items?.push(cartItem)
}

const cartJson = JSON.stringify(cart);
localStorage.setItem('cart', cartJson);
this.cart$.next(cart);
return cart;
}

deleteCartItem(productId: string) {
  const cart = this.getCart();
  const newCart = cart.items.filter((item) => item.productId !== productId);

  cart.items = newCart;

  const cartJsonString = JSON.stringify(cart);
  localStorage.setItem('cart', cartJsonString);

  this.cart$.next(cart);
}

emptyCart() {
  const intialCart = {
    items: []
  };
  const intialCartJson = JSON.stringify(intialCart);
  localStorage.setItem('cart', intialCartJson);
  this.cart$.next(intialCart);
}

}


