export interface Category {
  id?: number;
  name?: string;
  imageURL?: string;
}

export interface CategoryResponse {
  categoryList: Category[];
}