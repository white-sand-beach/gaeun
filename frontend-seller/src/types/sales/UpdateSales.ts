export interface UpdateSales {
    saleId: number;
    storeId: number;
    menuId: number;
    content: string;
    isFinished: boolean;
    stock: number;
}