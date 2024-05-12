export type GetSalesListType = {
    saleId: number;
    imageUrl: string;
    name: string;
    originalPrice: number;
    sellPrice: number;
    discountRate: number;
    content: string;
    restStock: number;
    isFinished: boolean;
}