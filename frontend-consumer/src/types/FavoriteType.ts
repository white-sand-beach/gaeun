export interface FavoriteItem {
  favoriteId: number;
  storeId: number;
  storeImageUrl: string;
  storeName: string;
  storeFavoriteCnt: number;
  storeReviewCnt: number;
}

export interface FavoriteResponse {
  code: number;
  msg: string;
  data: {
    totalCnt: number;
    favorites: FavoriteItem[] | null;
    page: number;
    hasNext: boolean;
  };
}

export interface FavoriteState {
  favorites: FavoriteItem[];
  totalCnt: number;
  page: number;
  loading: boolean;
  hasNext: boolean;
  scrollPosition: number;
}
