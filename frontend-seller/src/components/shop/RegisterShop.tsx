import camera from "../../assets/addphoto.png"
import useShopStore from "../../store/shop/UseShopStore";
import TotalButton from "../ui/TotalButton";

const RegisterShop = () => {
    const { updateShopStore } = useShopStore();

    // name은 input 태그의 name 옵션
    // value는 input 태그의 value 옵션
    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        // 입력값을 store에 전달. 데이터 관리
        updateShopStore(name, value);
    };

    return (
        <div className="flex flex-col items-center w-screen h-full gap-3">
            {/* 사진 등록하기 */}
            <div className="flex flex-col items-center justify-center w-full h-[360px] bg-gray-300">
                <img src={camera} alt="" className="m-2" />
                <label htmlFor="input-file" className="text-2xl font-bold">사진 등록하기</label>
                <input name="shopImage" type="file" accept="image/*" id="input-file" className="hidden" />
            </div>
            <div className="flex flex-col items-center justify-center">
                {/* 가게(상호)명 입력하기 */}
                <div className="flex flex-col gap-2">
                    <p className="mt-10 text-xl font-bold">가게(상호명)</p>
                    <input name="shopName" type="text" placeholder="가게(상호)명을 입력해주세요." className="w-[320px] border-b-2 bg-orange-50" />
                </div>

                {/* 대표자명 입력하기 */}
                <div className="flex flex-col gap-2">
                    <p className="mt-10 text-xl font-bold">대표자명</p>
                    <input name="shopOwner" type="text" placeholder="대표자명을 입력해주세요." className="w-[320px] border-b-2 bg-orange-50" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <p className="mt-10 text-xl font-bold">주소</p>
                        <button className="detail-btn">주소 검색</button>
                    </div>
                    <input type="text" placeholder="여기를 눌러 주소를 검색해주세요." className="w-[320px] border-b-2 bg-orange-50" readOnly />
                    <input type="text" placeholder="상세주소를 입력해주세요." className="w-[320px] border-b-2 bg-orange-50" />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="mt-10 text-xl font-bold">가게 전화번호</p>
                    <input type="text" placeholder="가게 전화번호를 입력해주세요." className="w-[320px] border-b-2 bg-orange-50" />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="mt-10 text-xl font-bold">가게 소개</p>
                    <input type="text" placeholder="가게 소개를 입력해주세요." className="w-[320px] border-b-2 bg-orange-50" />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="mt-10 text-xl font-bold">영업시간 / 휴무일</p>
                    <textarea name="" id="" placeholder="영업시간을 입력해주세요." className="border-b-2 bg-orange-50 w-[320px] h-[200px]" />
                    <textarea name="" id="" placeholder="휴무일을 입력해주세요." className="border-b-2 bg-orange-50 w-[320px] h-[200px]" />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="mt-10 text-xl font-bold">재료 / 원산지</p>
                    <textarea name="" id="" placeholder="재료 및 원산지를 입력해주세요." className="border-b-2 bg-orange-50 w-[320px] h-[200px]" />
                </div>
            </div>

            <TotalButton
                title="가게 등록하기" />
        </div>
    );
};

export default RegisterShop;