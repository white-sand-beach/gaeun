// Cart.ts, AddCart.ts
export interface Cart {
  storeId: number;
  storeName: string;
  isOpened: boolean;
  cartResponseList: CartItem[];
  originalTotalPrice: number;
  discountTotalPrice: number;
  sellTotalPrice: number;
}

export interface CartItem {
  cartId: string;
  saleId: number;
  imageUrl: string;
  saleName: string;
  originalPrice: number;
  sellPrice: number;
  discountRate: number;
  content: string;
  restStock: number;
  isFinished: boolean;
  quantity: number;
}