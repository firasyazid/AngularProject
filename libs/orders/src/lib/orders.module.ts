import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeModule } from 'primeng/badge';
import { CartService } from './services/cart/cart.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you/thank-you.component';
import { HttpClientModule } from '@angular/common/http';

export const ordersRoutes: Route[] = [];


const routes: Routes=[ 

{ 
path:'cart' , 
component:CartPageComponent

}, 
{
path:'checkout' , 
component:CheckoutPageComponent,

}, 
{
path:'thankyou' , 
component: ThankYouComponent,

}, 
]

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
    MatBadgeModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
     ReactiveFormsModule,
    BadgeModule,
    InputMaskModule,  
    DropdownModule,
    InputNumberModule, 
    FormsModule,
    HttpClientModule
  ],
  declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent,CheckoutPageComponent, ThankYouComponent],
  exports: [CartIconComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
