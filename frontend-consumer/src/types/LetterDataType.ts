// LetterData.ts
export interface LetterData {
  content: string;
  image?: File | null; // 가게 이미지
  storeId: number;
  orderInfoId: number;
}
