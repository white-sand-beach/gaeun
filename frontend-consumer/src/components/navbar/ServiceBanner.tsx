import logo from "/public/icons/size-512.png";

const ServiceBanner = () => {
  return (
    <div className="center">
      <img className="rounded-full w-14" src={logo} alt="배너 이미지" />
      <div className="font-bold text-amber-950">
        <p className="text-xs">음식물쓰레기는 더이상 NO!</p>
        <h1 className="text-xl">남김없이 다먹기</h1>
      </div>
    </div>
  );
};

export default ServiceBanner;
