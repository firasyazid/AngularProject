import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { OrdersService } from '../../../services/cart/order.service';

@Component({
  selector: 'orders-thankyou',
  templateUrl: './thank-you.component.html',
  styles: [
  ]
})
export class ThankYouComponent implements OnInit {

  constructor(private orderService: OrdersService, private cartService : CartService) { }

  ngOnInit(): void {

    const orderData = this.orderService.getOrderData(); 

    this.orderService.createOrder(orderData).subscribe(()=> { 

this.cartService.emptyCart();
this.orderService.removechachedorder();
    })
  }

}
