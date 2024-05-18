import { useState, useEffect } from "react";
import logo from "../../../public/android/android-launchericon-512-512.png";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import banner4 from "../../assets/banner/banner4.png";

export const ServiceBanner = () => {
  return (
    <div className="center">
      <img className="rounded-full w-14" src={logo} alt="배너 이미지" />
      <div
        className="ml-1 font-bold text-amber-950"
        style={{ fontFamily: "'MyFont', sans-serif" }}
      >
        <p className="text-sm">음식물쓰레기는 더이상 NO!</p>
        <h1 className="text-2xl">남김없이 다먹기</h1>
      </div>
    </div>
  );
};

export const ServiceBanner1 = () => {
  return (
    <div className="center">
      <img className="rounded-full w-14" src={banner1} alt="배너 이미지" />
      <div
        className="ml-3 font-bold text-amber-950"
        style={{ fontFamily: "'MyFont', sans-serif" }}
      >
        <p className="text-sm">음식을 나누는 행복한 세상</p>
        <h1 className="text-2xl">함께 만들어가요</h1>
      </div>
    </div>
  );
};

export const ServiceBanner2 = () => {
  return (
    <div className="center">
      <img className="rounded-full w-14" src={banner2} alt="배너 이미지" />
      <div
        className="ml-3 font-bold text-amber-950"
        style={{ fontFamily: "'MyFont', sans-serif" }}
      >
        <p className="text-sm">가운데에서 나눔을 베풀다</p>
        <p className="text-2xl">우리모두, 가은</p>
      </div>
    </div>
  );
};

export const ServiceBanner3 = () => {
  return (
    <div className="center">
      <img className="rounded-full w-14" src={banner3} alt="배너 이미지" />
      <div
        className="ml-3 font-bold text-amber-950"
        style={{ fontFamily: "'MyFont', sans-serif" }}
      >
        <p className="text-sm">오늘부터 시작 하는</p>
        <h1 className="text-2xl">음식문화 만들기</h1>
      </div>
    </div>
  );
};

export const ServiceBanner4 = () => {
  return (
    <div className="center">
      <img className="rounded-full w-14" src={banner4} alt="배너 이미지" />
      <div
        className="ml-3 font-bold text-amber-950"
        style={{ fontFamily: "'MyFont', sans-serif" }}
      >
        <p className="text-sm">음식을 나눔하는</p>
        <h1 className="text-xl">천사가게 살펴볼까요?</h1>
      </div>
    </div>
  );
};

const banners = [
  ServiceBanner,
  ServiceBanner1,
  ServiceBanner2,
  ServiceBanner3,
  ServiceBanner4,
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const Banner = banners[index];

  return <Banner />;
}
