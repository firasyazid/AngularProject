import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@eshop/users';
import { StripeService } from 'ngx-stripe';
 import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderI-item';
import { CartService } from '../../services/cart/cart.service';
import { OrdersService } from '../../services/cart/order.service';



@Component({
  selector: 'orders-checkout',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  constructor(    private router: Router,
    private userService:UserService ,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService:OrdersService, 
    private stripeService : StripeService,
  ) { }

checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId ='62afc4f278373b787a1c36e5';
 
  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
 
  }
  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
       zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    console.log(this.orderItems);
  }

 
  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
 
   const order: Order = {
    orderItems: this.orderItems,
    shippingAddress1: this.checkoutForm['street'].value,
  shippingAddress2: this.checkoutForm['apartment'].value,
     city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
       phone: this.checkoutForm['phone'].value,
      user: this.userId,
      dateOrdered: `${Date.now()}`
};
this.ordersService.cacherOrderData(order); 

this.ordersService.createCheckoutSession(this.orderItems).subscribe((error)=> {
 

  if (error) { 
  
    console.log('error in payment')
  }
  
 
    
     }) ;
  
  
   

  }


  backToCart() {
    this.router.navigate(['/cart']);
  }
  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  
}
