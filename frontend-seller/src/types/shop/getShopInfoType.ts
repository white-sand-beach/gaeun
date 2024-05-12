export type getShopInfoType = {
    registeredName?: string;
    registeredNo?: number;
    bossName?: string;
    address?: string;
    roadAddress: string;
    latitude?: number;
    longitude?: number;
    tel: string;
    name: string;
    imageURL: string;
    operatingTime?: string;
    holiday?: string;
    originCountry?: string;
    introduction?: string;
    categoryList?: [
        {
            categoryId: number;
            name: string;
            imageURL: string;
        }
    ];
};