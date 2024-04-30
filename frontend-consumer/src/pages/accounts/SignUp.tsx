import SiignUpButton from "../../components/button/SiignUpButton";
import NickNameCheck from "../../components/user_info/NickNameCheck";
import PhoneCheck from "../../components/user_info/PhoneCheck";

const SignUp = () => {
  return (
    <div className="pt-14">
      <div className="mt-8 center">
        {/* 실제로 붇어올 Kakao Img */}
        <img
          className="w-32 h-32 rounded-full"
          src="https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.webp"
          alt=""
        />
      </div>

      <div className="flex justify-center mt-8">
        <NickNameCheck />
      </div>

      <div className="flex justify-center mt-8">
        <PhoneCheck />
      </div>
      <div className="center my-8">
        <SiignUpButton />
      </div>
    </div>
  );
};

export default SignUp;
