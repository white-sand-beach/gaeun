export interface ReviewResponse {
  code: number;
  msg: string;
  data: {
    reviewList: reviewListItem[] | null;
    page: number;
    hasNext: boolean;
    totalCnt: number;
  };
}

export interface reviewListItem {
  reviewId: number;
  content: string;
  imageUrl: string;
  consumerId: number;
  nickname: string;
  storeId: number;
  storeName: string;
  createdAt: string;
}

export interface ReviewState {
  reviewList: reviewListItem[];
  totalCnt: number;
  page: number;
  loading: boolean;
  hasNext: boolean;
  scrollPosition: number;
}
