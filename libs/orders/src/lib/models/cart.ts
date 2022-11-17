export class Cart {
    items?: CartItem[];
  }
  
  export class CartItem {
    productId?: string;
    quantity?: number;
  }
  
  export class CartItemsDetailed {
    product?: any;
    quantity?: number;
  }
  