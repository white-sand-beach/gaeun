export type PutMenuAPIType = {
  image: File | string | null;
  name: string;
  originalPrice: number;
  sellPrice: number;
  storeId?: number;
  menuId?: string;
}