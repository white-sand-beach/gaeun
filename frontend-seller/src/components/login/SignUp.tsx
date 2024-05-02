import { useNavigate } from "react-router-dom";
import TotalButton from "../ui/TotalButton.tsx";

const SignUp = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col gap-3">
            {/* 이메일 입력 */}
            <p className="m-2 text-2xl font-bold">이메일</p>
            <div className="flex flex-row gap-3">
                <input type="text" placeholder="이메일을 입력하세요." className="w-[240px] border-b-2" />
                <button className="detail-btn w-[72px]">중복확인</button>
            </div>

            {/* 비밀번호 입력 */}
            <p className="m-2 text-2xl font-bold">비밀번호</p>
            <div className="flex flex-col gap-3">
                <input type="text" placeholder="비밀번호" className="w-full border-b-2" />
                <input type="text" placeholder="비밀번호 확인" className="w-full border-b-2" />
            </div>

            {/* 전화번호 인증 */}
            <p className="m-2 text-2xl font-bold">전화번호 인증</p>
            <div className="flex flex-col gap-3">
                {/* 인증 요청하기 */}
                {/* 어떤 방식으로 인증을 요청할지 아직 미정 */}
                <div className="flex flex-row gap-3">
                    <input type="text" placeholder="전화번호를 입력하세요." className="w-[240px] border-b-2" />
                    <button className="detail-btn w-[72px]">인증</button>
                </div>
                {/* 받은 인증번호 입력칸 */}
                {/* 인증 방식에 따라서 없어질 수 있음 */}
                <div className="flex flex-row gap-3">
                    <input type="text" placeholder="인증번호를 입력하세요." className="w-[240px] border-b-2" />
                    <button className="detail-btn w-[72px]">인증확인</button>
                </div>

            </div>

            {/* 사업자 등록번호 인증 */}
            <p className="m-2 text-2xl font-bold">사업자 등록번호</p>
            <div className="flex flex-row gap-3">
                <input type="text" placeholder="사업자등록번호를 입력하세요." className="w-[240px] border-b-2" />
                <button className="detail-btn w-[72px]">인증</button>
            </div>

            {/* 가입하기 */}
            <TotalButton 
            title="가입하기"
            onClick={()=>navigate("/signupFin")}/>
        </div>
    );
};

export default SignUp;