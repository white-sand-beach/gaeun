import { KeywordInfo } from "../../types/PopularSearchList";
import logo from "../../../public/android/android-launchericon-512-512.png";

interface RealTimeTrendingSearchProps {
    popularSearchList: KeywordInfo[];
    hour: number;
    onKeywordClick: (keyword: string) => void;
  }

const RealTimeTrendingSearch = ({ popularSearchList, hour, onKeywordClick }: RealTimeTrendingSearchProps) => {
  return (
    <div>
      <div className="w-[300px] text-sm">
        <div className="px-4 between">
          <div className="text-sm font-bold">
            <h1>실시간 급상승 검색어 순위</h1>
            <p className="text-sm font-normal text-gray-400">{hour}시 기준</p>
          </div>
          <img className="w-12 mr-4 rounded-lg" src={logo} alt="로고" />
        </div>
      </div>

      <div className="center">
        <div className="w-[150px] pl-4">
          {popularSearchList.slice(0, 5).map((item, index) => (
            <div className="pt-2" key={index} onClick={() => onKeywordClick(item.keyword)}>
              <span className="font-mono font-bold">{index + 1} </span>
              {item.keyword}
            </div>
          ))}
        </div>
        <div className="w-[150px] pl-4">
          {popularSearchList.slice(6, 10).map((item, index) => (
            <div className="pt-2" key={index} onClick={() => onKeywordClick(item.keyword)}>
              <span className="font-mono font-bold">{index + 6} </span>
              {item.keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeTrendingSearch;
