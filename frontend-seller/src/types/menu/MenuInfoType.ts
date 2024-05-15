export type MenuInfoType = {
  menuId: number;
  imageUrl: string;
  name: string;
  originalPrice: number;
  sellPrice: number;
  discountRate?: number;
  stock: number;
  content: string;
}