import { useState, useEffect } from "react";
import searchIcon from "../../assets/search/searchIcon.png";
import './StoreSearch.css';

const rankList = [
  "1 메가커피",
  "2 BHC",
  "3 피자나라치킨공주",
  "4 엽기떡볶이",
  "5 맥도날드",
  "6 카츠현",
  "7 돈까스에 빠지다",
  "8 맘스터치",
  "9 KFC",
  "10 BBQ",
];

// 연습 삼아 만들었는데 
// 코드도 난잡하고 성능 최적화도 안되어 있어서
// 나중에 싹 수정하도록 하겠습니다
const StoreSearch = () => {
  const [placeholder, setPlaceholder] = useState<string>('가게 이름 또는 메뉴 검색');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % rankList.length);
        setIsAnimating(false);
      }, 530);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholder(rankList[currentIndex]);
  }, [currentIndex]);


  return (
    <div className="search">
      <input
        className={`w-[250px] py-2 text-xs pl-2  ${isAnimating ? 'animate-placeholder' : ''}`}
        type="text"
        placeholder={placeholder}
      />
      <button>
        <img className="mr-1" src={searchIcon} alt="검색" />
      </button>
    </div>
  );
};

export default StoreSearch;
