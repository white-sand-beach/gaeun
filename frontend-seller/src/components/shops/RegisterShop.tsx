import camera from "../../assets/addphoto.png"

const RegisterShop = () => {
    return (
        <div className="flex flex-col items-center">
            {/* 사진 등록하기 */}
            <div className="flex flex-col items-center justify-center w-full h-[400px] bg-gray-300">
                <img src={camera} alt="" className="m-2" />
                <p className="text-xl font-bold">사진 등록하기</p>
            </div>

            {/* 가게(상호)명 입력하기 */}
            <label htmlFor="">가게(상호명)</label>
            <input type="text" placeholder="가게(상호)명을 입력해주세요." className="w-[240px] border-b-2" />

            {/* 대표자명 입력하기 */}
            <p className="mt-10">대표자명</p>
            <input type="text" placeholder="대표자명을 입력해주세요." className="w-[240px] border-b-2" />

            {/* 추가 정보 입력하는 페이지로 이동 */}
            <button className="common-btn">다음</button>
        </div>
    );
};

export default RegisterShop;