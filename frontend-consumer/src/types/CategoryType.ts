export interface Category {
  categoryId?: number;
  name?: string;
  imageURL?: string;
}

export interface CategoryResponse {
  categoryList: Category[];
}