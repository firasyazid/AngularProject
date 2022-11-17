import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';
import { ProductsModule } from '@eshop/products';
 
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
 import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@eshop/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@eshop/orders';
import {  NgxStripeModule } from 'ngx-stripe';
  
const routes: Routes = [
  { path: '', component: HomePageComponent },
 
   ];

@NgModule({
  declarations: [
    AppComponent,
     HomePageComponent,
     HeaderComponent,
    FooterComponent,
    NavComponent
     
   ],

  imports: [BrowserModule,RouterModule.forRoot(routes), UiModule,AccordionModule,
     ProductsModule,UiModule,HttpClientModule,OrdersModule,
    NgxStripeModule.forRoot('pk_test_51LksljFvCFVk0GqtcX9f3CFjUtnGkGweDMuhzNKntWXxWejt0qIZFm5C8gup46LWlsOxneRBUh08iYNU8oInIV6a005ptI3NFx')],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
