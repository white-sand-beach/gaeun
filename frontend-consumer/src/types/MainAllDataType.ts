// MainAllData.ts
import { StoreList } from "./StoreList";

export interface MainAllData {
  storeList: StoreList[];
  page: number;
  hasNext: boolean;
  loading?: boolean;
  isDonated: boolean;
}
