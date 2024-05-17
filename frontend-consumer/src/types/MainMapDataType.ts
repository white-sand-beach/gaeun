// 상태 인터페이스 정의 !
interface MainMapData {
  radius?: number;
  longitude: number | undefined;
  latitude: number | undefined;
  page: number;
  size: number;
  sort?: string;
  keyword?: string;
  categoryId?: string;
}

export default MainMapData;
