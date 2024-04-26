import logo from "../../../public/icons/size-512.png";

interface TrendingItem {
  rank: number;
  name: string;
}

const trendingItems: TrendingItem[] = [
  { rank: 1, name: "메가커피" },
  { rank: 2, name: "BHC" },
  { rank: 3, name: "피자나라치킨공주" },
  { rank: 4, name: "엽기떡볶이" },
  { rank: 5, name: "맥도날드" },
  { rank: 6, name: "카츠현" },
  { rank: 7, name: "돈까스에 빠지다" },
  { rank: 8, name: "맘스터치" },
  { rank: 9, name: "KFC" },
  { rank: 10, name: "BBQ" },
];

// 현재시간,
const RealTimeTrendingSearch = () => {

  return (
    <div className="w-[300px] text-sm">
      <div className="between px-4">
        <div className="text-sm font-bold">
          <h1>실시간 급상승 검색어 순위</h1>
          <p className="text-gray-400 text-sm font-normal">00:00 기준</p>
        </div>
        <img className="w-12 rounded-lg mr-4" src={logo} alt="로고" />
      </div>

      {/* 순위 */}
      <div className="center">
        <div className="w-[150px] pl-4">
          {trendingItems.slice(0, 5).map((item) => (
            <div className="pt-2" key={item.rank}>
              <span className="font-bold font-mono">{item.rank} </span>
              {item.name}
            </div>
          ))}
        </div>
        <div className="w-[150px] pl-4">
          {trendingItems.slice(5, 10).map((item) => (
            <div className="pt-2" key={item.rank}>
              <span className="font-bold font-mono">{item.rank} </span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeTrendingSearch;
