import { KeywordInfo } from "../../types/PopularSearchList";

interface RealTimeTrendingSearchProps {
    popularSearchList: KeywordInfo[];
    hour: number;
    onKeywordClick: (keyword: string) => void;
}

const RealTimeTrendingSearch = ({ popularSearchList, hour, onKeywordClick }: RealTimeTrendingSearchProps) => {
    return (
        <div className="w-full flex flex-col items-center my-4">
            <div className="w-full max-w-2xl text-sm bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-bold ml-2">
                        <h1 className="text-lg">실시간 급상승 검색어 순위</h1>
                        <p className="text-sm font-normal text-gray-400">{hour}시 기준</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-lg">
                        {popularSearchList.slice(0, 5).map((item, index) => (
                            <div
                                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md" key={index} onClick={() => onKeywordClick(item.keyword)}>
                                <span className="font-mono font-bold text-lg mr-2">{index + 1} </span>
                                <span className="text-base">{item.keyword}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-lg">
                        {popularSearchList.slice(5, 10).map((item, index) => (
                            <div
                                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md" key={index} onClick={() => onKeywordClick(item.keyword)}>
                                <span className="font-mono font-bold text-lg mr-2"> {index + 6} </span>
                                <span className="text-base">{item.keyword}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealTimeTrendingSearch;
