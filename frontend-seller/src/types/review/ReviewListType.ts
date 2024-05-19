export interface ReviewListType {
  reviewList : [
    {
      reviewId: number;
      content: string;
      imageUrl: string;
      consumerId: number;
      nickname: string;
      storeId: number;
      storeName: string;
      createdAd: string;
    }
  ],
  page: number;
  hasNext: boolean;
  totalCnt: number;
}