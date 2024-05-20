// Cart.ts, AddCart.ts
export interface CartInfo {
  storeId: number;
  storeName: string;
  isOpened: boolean;
  cartResponseList: CartItem[];
  originalTotalPrice: number;
  discountTotalPrice: number;
  sellTotalPrice: number;
  imageURL: string;
}

export interface CartItem {
  name: string;
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