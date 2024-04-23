const SignUp = () => {
    return (
        <div className="main-layout w-[400px] gap-3">
            {/* 이메일 입력 */}
            <p className="text-2xl font-bold m-2">이메일</p>
            <div className="flex flex-row gap-3">
                <input type="text" placeholder="이메일을 입력하세요." className="w-[240px] border-b-2" />
                <button className="detail-btn w-[72px]">중복확인</button>
            </div>

            {/* 비밀번호 입력 */}
            <p className="text-2xl font-bold m-2">비밀번호</p>
            <div className="flex flex-col gap-3">
                <input type="text" placeholder="비밀번호" className="w-[240px] border-b-2" />
                <input type="text" placeholder="비밀번호 확인" className="w-[240px] border-b-2" />
            </div>

            {/* 전화번호 인증 */}
            <p className="text-2xl font-bold m-2">전화번호 인증</p>
            <div className="flex flex-col gap-3">
                {/* 인증 요청하기 */}
                {/* 어떤 방식으로 인증을 요청할지 아직 미정 */}
                <div>
                    <input type="text" placeholder="전화번호를 입력하세요." className="w-[240px] border-b-2" />
                    <button className="detail-btn w-[72px]">인증</button>
                </div>
                {/* 받은 인증번호 입력칸 */}
                {/* 인증 방식에 따라서 없어질 수 있음 */}
                <div>
                    <input type="text" placeholder="인증번호를 입력하세요." className="w-[240px] border-b-2" />
                    <button className="detail-btn w-[72px]">인증확인</button>
                </div>

            </div>

            {/* 사업자 등록번호 인증 */}
            <p className="text-2xl font-bold m-2">사업자 등록번호</p>
            <div className="flex flex-row gap-3">
                <input type="text" placeholder="사업자등록번호를 입력하세요." className="w-[240px] border-b-2" />
                <button className="detail-btn w-[72px]">인증</button>
            </div>

            {/* 가입하기 */}
            <button className="common-btn">가입하기</button>
        </div>
    );
};

export default SignUp;