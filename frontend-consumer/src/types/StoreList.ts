// Store.ts
import { Category } from "./Category";

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
}
