import testImg from "../../assets/store-test-img.png"

const MyPage = () => {
  return (
    <div className="yes-footer top-[60px] gap-3">
      <img src={testImg} alt="가게 대표 이미지" className="w-full h-[400px]"/>
      <p>가게 상호명</p>
      <div className="flex flex-row justify-between">
        <div>
          <img src="" alt="리뷰조회" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;