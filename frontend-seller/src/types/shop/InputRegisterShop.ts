import { CategoryIdType } from "./CategoryIdType";

export type InputRegisterShop = {
    shopImage?: File | null; // 가게 이미지
    shopName: string; // 가게명
    shopRegisteredName: string; // 상호명
    shopOwner: string; // 대표자명
    shopNumber: string; // 가게 전화번호
    shopzibunAddr: string; // 지번 주소
    shoproadAddr: string; // 도로명 주소
    shopDetailAddr: string; // 상세 주소
    shopLat: number; // 가게 위도 ( 소비자용 )
    shopLon: number; // 가게 경도 ( 소비자용 )
    shopIntro?: string;  // 가게소개
    shopWorkday?: string; // 영업시간
    shopHoliday?: string; // 휴무일
    FoodOrigin?: string; // 원산지
    shopCategoryId: number[]; // 카테고리 id
    onUpdateShopStore: <K extends keyof InputRegisterShop>(key: K, value: InputRegisterShop[K]) => void | null;
    onResetShopStore?: () => void;
    onRegisterShop?: () => void;

    categoryList?: CategoryIdType[]
}