import { useRef } from "react";
import camera from "../../assets/addphoto.png"
import TotalButton from "../ui/TotalButton";

const RegisterShop = () => {
    const imgRef = useRef<HTMLImageElement>(null)
    
    return (
        <div className="flex flex-col items-center w-screen h-full gap-3">
            {/* 사진 등록하기 */}
            <div className="flex flex-col items-center justify-center w-full h-[320px] bg-gray-300">
                <img src={camera} alt="" className="m-2" />
                <label htmlFor="input-file" className="text-2xl font-bold">사진 등록하기</label>
                <input type="file" accept="image/*" id="input-file" className="hidden" />
                <img ref={imgRef} alt="" />
            </div>

            <div className="flex flex-col items-center justify-center mt-2">
                {/* 가게(상호)명 입력하기 */}
                <p className="mt-10 text-xl font-bold">가게(상호명)</p>
                <input type="text" placeholder="가게(상호)명을 입력해주세요." className="w-[320px] border-b-2" />

                {/* 대표자명 입력하기 */}
                <p className="mt-10 text-xl font-bold">대표자명</p>
                <input type="text" placeholder="대표자명을 입력해주세요." className="w-[320px] border-b-2" />
                
                <p className="mt-10 text-xl font-bold">주소</p>
                <input type="text" placeholder="여기를 눌러 주소를 검색해주세요." className="w-[320px] border-b-2" readOnly />
                <input type="text" placeholder="상세주소를 입력해주세요." className="w-[320px] border-b-2" />

                <p className="mt-10 text-xl font-bold">가게 전화번호</p>
                <input type="text" placeholder="가게 전화번호를 입력해주세요." className="w-[320px] border-b-2" />

                <p className="mt-10 text-xl font-bold">가게 소개</p>
                <input type="text" placeholder="가게 소개를 입력해주세요." className="w-[320px] border-b-2" />

                <p className="mt-10 text-xl font-bold">영업시간 / 휴무일</p>
                <textarea name="" id="" placeholder="영업시간을 입력해주세요." className="border-b-2 w-[320px] h-[200px]" />
                <textarea name="" id="" placeholder="휴무일을 선택해주세요." className="border-b-2 w-[320px] h-[200px]" />

                <p className="mt-10 text-xl font-bold">재료 / 원산지</p>
                <textarea name="" id="" placeholder="재료를 입력해주세요." className="border-b-2 w-[320px] h-[200px]" />
                <textarea name="" id="" placeholder="원산지를 입력해주세요." className="border-b-2 w-[320px] h-[200px]" />
            </div>

            <TotalButton
                title="가게 등록하기" />
        </div>
    );
};

export default RegisterShop;