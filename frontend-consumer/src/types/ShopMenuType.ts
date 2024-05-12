export interface MenuItem {
  saleId: number;
  imageUrl: string;
  name: string;
  originalPrice: number;
  sellPrice: number;
  discountRate: number;
  content: string;
  restStock: number;
  totalPrice?: number;
}

export interface ShopMenuType {
  storeId: number;
  saleList: MenuItem[];
  size: number;
}
