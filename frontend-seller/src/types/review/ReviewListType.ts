export interface ReviewListType {
  reviewList: ReviewInfoType[],
  page: number;
  hasNext: boolean;
  totalCnt: number;
}

export interface ReviewInfoType {
  reviewId: number;
  content: string;
  imageUrl: string;
  consumerId: number;
  nickname: string;
  storeId: number;
  storeName: string;
  createdAd: string;
}