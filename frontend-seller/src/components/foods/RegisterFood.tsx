import logo from "/icons/size-192.png"
import camera from "@/assets/addphoto.png"

const RegisterFood = () => {
    return (
        <div className="no-footer top-[100px] gap-3">
            {/* 음식 이미지 추가 */}
            <div>
                <img src={logo} alt="음식사진" className="w-[120px]" />
                <img src={camera} alt="사진 추가" className="w-[35px] relative z-10 -top-6 left-[90px]" />
            </div>

            {/* 음식명 입력칸 */}
            <input type="text" placeholder="음식명을 입력하세요." className="w-[290px] border-b-[3px]" />

            {/* 원가 입력칸 */}
            <div className="flex flex-row mt-10">
            <input type="number" placeholder="상품의 원가를 입력하세요." className="w-[270px] border-b-[3px]" />
            <p className="text-xl font-bold">원</p>
            </div>

            {/* 판매가 입력칸 */}
            <div className="flex flex-col mt-10">
                <div className="flex flex-row">
                <input type="number" placeholder="상품의 판매가를 입력하세요." className="w-[270px] border-b-[3px]" />
                <p className="text-xl font-bold">원</p>
                </div>
                <p className="text-[12px] text-gray-500 mt-2 font-bold">최초 등록 이후에도 판매가는 수정할 수 있습니다.</p>
            </div>

            <button className="mt-14 common-btn">등록하기</button>
        </div>
    );
};

export default RegisterFood;