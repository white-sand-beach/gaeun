import camera from "../../assets/addphoto.png"

const RegisterShop = () => {
    return (
        <div className="">
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
            <p>주소</p>
            <input type="text" placeholder="여기를 눌러 주소를 검색해주세요." className="border-b-2" readOnly />
            <input type="text" placeholder="상세주소를 입력해주세요." className="border-b-2" />

            <p>가게 전화번호</p>
            <input type="text" placeholder="가게 전화번호를 입력해주세요." className="border-b-2" />

            <p>가게 소개</p>
            <input type="text" placeholder="가게 소개를 입력해주세요." className="border-b-2" />

            <p>영업시간 / 휴무일</p>
            <textarea name="" id="" cols={30} rows={10} placeholder="영업시간을 입력해주세요." className="border-b-2"></textarea>
            <textarea name="" id="" cols={30} rows={10} placeholder="휴무일을 선택해주세요." className="border-b-2"></textarea>

            <p className="mt-6">재료 / 원산지</p>
            <textarea name="" id="" cols={30} rows={10} placeholder="재료를 입력해주세요." className="border-b-2"></textarea>
            <textarea name="" id="" cols={30} rows={10} placeholder="원산지를 입력해주세요." className="border-b-2"></textarea>

            <button className="mt-2 common-btn">다음</button>
        </div>
    );
};

export default RegisterShop;