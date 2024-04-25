import list from "../../assets/map/list.png";
import gps from "../../assets/map/gps.png";

const Map = () => {
  return (
    <div>
      <div className="pt-16">
        <div className="flex justify-between px-1">
          <div className="p-1 px-3 border-2 shadow-xl rounded-xl border-darkgray">
            가까운 순
          </div>
          <div className="p-1 px-3 border-2 shadow-xl rounded-xl border-darkgray">
            리뷰 많은 순
          </div>
          <div className="p-1 px-3 border-2 shadow-xl rounded-xl border-darkgray">
            찜 많은 순
          </div>
        </div>
      </div>
      <div className="relative mt-2 mb-20 border-2 border-black pb-25 p-36">
        {/* 왼쪽 버튼 */}
        <button className="absolute p-3 transform -translate-y-1/2 bg-white rounded-full shadow-xl left-4 bottom-4">
          <div className="flex items-center justify-center w-5 h-5 rounded-full">
            <img src={gps} alt="Gps Icon" className="object-cover" />
          </div>
        </button>

        {/* 오른쪽 버튼 */}
        <button className="absolute p-3 transform -translate-y-1/2 bg-white rounded-full shadow-xl right-4 bottom-4">
          <div className="flex items-center justify-center w-5 h-5 rounded-full">
            <img src={list} alt="List Icon " className="object-cover" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Map;
