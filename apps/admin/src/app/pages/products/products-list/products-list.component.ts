import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@eshop/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
   products: Product[] = [];
 

  constructor(

    private productsService: ProductsService,
    private router: Router,


  ){}

  ngOnInit(): void {

    this._getproducts();
  }


  private _getproducts(){ 

    this.productsService.getProducts().subscribe( (p) => { 


      this.products = p;
    }
      
      
      )
  }
  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }
  
}
