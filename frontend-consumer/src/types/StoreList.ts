// Store.ts
import { Category } from "./Category";
import { SaleImageURLType } from "./SaleImageURLListType";

export interface StoreList {
  storeId: number;
  address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  name: string;
  operatingTime: string;
  reviewCnt: number;
  favoriteCnt: number;
  distance: number;
  categoryList: Category[];
  saleImageURLList: SaleImageURLType[];
  imageURL?: string;
  isExample: boolean;
}
