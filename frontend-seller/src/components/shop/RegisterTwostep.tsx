const RegisterTwostep = () => {
    return (
        <>
        <p>주소</p>
        <input type="text" placeholder="여기를 눌러 주소를 검색해주세요." className="border-b-2" readOnly/>
        <input type="text" placeholder="상세주소를 입력해주세요." className="border-b-2"/>

        <p>가게 전화번호</p>
        <input type="text" placeholder="가게 전화번호를 입력해주세요." className="border-b-2"/>

        <p>가게 소개</p>
        <input type="text" placeholder="가게 소개를 입력해주세요." className="border-b-2"/>

        <button className="mt-2 common-btn">다음</button>
        </>
    );
};

export default RegisterTwostep;