import camera from "@/assets/addphoto.png"

const RegisterShop = () => {
    return (
        <>
            {/* 사진 등록하기 */}
            <div className="flex flex-col items-center justify-center w-full h-[320px] bg-gray-300">
                <img src={camera} alt="" className="m-2" />
                <p className="text-xl font-bold">사진 등록하기</p>
            </div>

            <div className="flex flex-col items-center justify-center mt-2">
                {/* 가게(상호)명 입력하기 */}
                <p className="mt-10">가게(상호명)</p>
                <input type="text" placeholder="가게(상호)명을 입력해주세요." className="w-[240px] border-b-2" />

                {/* 대표자명 입력하기 */}
                <p className="mt-10">대표자명</p>
                <input type="text" placeholder="대표자명을 입력해주세요." className="w-[240px] border-b-2" />
            </div>

            <button className="mt-2 common-btn">다음</button>
        </>
    );
};

export default RegisterShop;