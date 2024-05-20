import loadingpage1 from "../../assets/loading/loadingpage1.gif";
import loadingpage2 from "../../assets/loading/loadingpage2.png";
import { loadingOptions } from "../../assets/lotties/lottieOptions";
import Lottie from "react-lottie";

const LoadingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F2F2F2] z-50">
      {/* Prevent scrolling */}
      <img src={loadingpage1} alt="로딩페이지1" className="object-cover" />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: "translateY(-10px)" }}
      >
        {/* Move second image up */}
        <img src={loadingpage2} alt="로딩페이지2" />
      </div>
      <div className="absolute right-0" style={{ top: "calc(50%)" }}>
        {/* Adjust Lottie position */}
        <Lottie options={loadingOptions} height={130} width={130} />
      </div>
      <div
        className="absolute bottom-0"
        style={{ transform: "translateY(70px)" }}
      ></div>
    </div>
  );
};

export default LoadingPage;
