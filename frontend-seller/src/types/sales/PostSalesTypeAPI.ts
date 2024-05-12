import { SalesListType } from "./SalesListType";

export type PostSalesTypeAPI = {
    storeId: number;
    saleList: SalesListType[]
    size: number;
}