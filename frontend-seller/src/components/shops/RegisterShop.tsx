import camera from "../../assets/addphoto.png"

const RegisterShop = () => {
    return (
        <div className="main-layout">
            {/* 사진 등록하기 */}
            <div className="flex flex-col justify-center items-center w-full max-h-[240px] h-full bg-gray-300">
                <img src={camera} alt="" className="m-2" />
                <p className="text-xl font-bold">사진 등록하기</p>
            </div>

            {/* 가게(상호)명 입력하기 */}
            <p className="mt-10">가게(상호)명</p>
            <input type="text" placeholder="가게(상호)명을 입력해주세요." className="w-[240px] border-b-2" />

            {/* 대표자명 입력하기 */}
            <p className="mt-10">대표자명</p>
            <input type="text" placeholder="대표자명을 입력해주세요." className="w-[240px] border-b-2" />

            {/* 추가 정보 입력하는 페이지로 이동 */}
            <button className="common-btn mt-20">다음</button>
        </div>
    );
};

export default RegisterShop;