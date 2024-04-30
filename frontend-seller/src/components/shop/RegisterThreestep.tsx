const RegisterThreestep = () => {
    return (
        <>
        <p>영업시간 / 휴무일</p>
        <textarea name="" id="" cols="30" rows="10" placeholder="영업시간을 입력해주세요." className="border-b-2"></textarea>
        <textarea name="" id="" cols="30" rows="10" placeholder="휴무일을 선택해주세요." className="border-b-2"></textarea>

        <p className="mt-6">재료 / 원산지</p>
        <textarea name="" id="" cols="30" rows="10" placeholder="재료를 입력해주세요." className="border-b-2"></textarea>
        <textarea name="" id="" cols="30" rows="10" placeholder="원산지를 입력해주세요." className="border-b-2"></textarea>

        <button className="mt-2 common-btn">가게 등록하기</button>
        </>
    );
};

export default RegisterThreestep;