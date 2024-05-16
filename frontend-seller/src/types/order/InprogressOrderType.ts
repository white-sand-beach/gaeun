import { OrderInfoType } from "./OrderInfoType";

export interface InprogressOrderType {
    orderInfo: OrderInfoType[];
    page: number;
    hasNext: boolean;
}