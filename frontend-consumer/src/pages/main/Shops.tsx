import food1 from "../../assets/foods/food1.png";
import food2 from "../../assets/foods/food2.png";
import food3 from "../../assets/foods/food3.jpg";
import food4 from "../../assets/foods/food4.jpg";
import food5 from "../../assets/foods/food5.jpg";

const Shops = () => {
  return (
    <div>
      <div>
        <div>
          <hr className="w-full my-2" />
          <div>
            <div className="flex justify-between">
              <div className="flex">
                <h2 className="text-lg font-bold text-sky-600">음식점 이름</h2>
                <p className="mt-auto ml-1 text-sm text-gray-500">일식</p>
              </div>
              <div>
                <p className="mt-1 mr-3 text-sm text-black">118m</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">20:00 마감</p>
            <p className="text-sm">리뷰 121 · 가게 찜 86</p>
          </div>
          {/* 이미지 슬라이더 부분 */}
          <div className="flex gap-2 mt-2 overflow-x-scroll scrollbar-hide">
            {/* 각 이미지 컨테이너 */}
            <div className="min-w-[140px] h-28">
              <img
                src={food1}
                alt="food1"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="min-w-[140px] h-28">
              <img
                src={food2}
                alt="food2"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="min-w-[140px] h-28">
              <img
                src={food3}
                alt="food3"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="min-w-[140px] h-28">
              <img
                src={food4}
                alt="food4"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="min-w-[140px] h-28">
              <img
                src={food5}
                alt="food5"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
