 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/orderI-item';
import { StripeService } from 'ngx-stripe';
 
 


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
 
  constructor(private http: HttpClient, private stripeService : StripeService) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders/');
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${'http://localhost:3000/api/v1/orders/'}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/v1/orders/', order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${'http://localhost:3000/api/v1/orders/'}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${'http://localhost:3000/api/v1/orders/'}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${'http://localhost:3000/api/v1/orders/'}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${'http://localhost:3000/api/v1/orders/'}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${'http://localhost:3000/api/v1/products/'}/${productId}`);
  }

  createCheckoutSession(orderItem: OrderItem[])  {
    return this.http.post<{id : string}>(`${'http://localhost:3000/api/v1/orders/'}/create-checkout-session`, orderItem )
    .pipe(switchMap((session: {id: string }) => {
     return  this.stripeService.redirectToCheckout({sessionId: session.id as string});

    }));
  }

  cacherOrderData(order:Order) { 

    localStorage.setItem('orderdata', JSON.stringify(order));
  }

getOrderData( ): Order{ 

    return JSON.parse(localStorage.getItem('orderdata'));
  }
removechachedorder() { 

  localStorage.removeItem('orderdata');
}
  }



