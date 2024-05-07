import axios from "axios";

// 이메일 중복 확인
const postEmailCheck = (email:string, setValid: (value: boolean) => void, setComment: (value: string) => void) => {
    axios.post(import.meta.env.BASE_URL + "/api/auth/check-email", {
        "email": email,
    })
    .then(() => {
        setValid(true)
        setComment("유효한 이메일입니다!")
    })
    .catch((err) => {
        setValid(false)
        setComment("이미 사용중인 이메일입니다!")
        console.error(err)
    })
};

// 사업자 등록번호 사용 여부 확인
const postCheckRegisterNo = (registerNo: string, setValid: (value: boolean) => void, setComment: (value: string) => void) => {
    axios.post(import.meta.env.BASE_URL + "/api/auth/check-registerd-no", {
        "registeredNo": registerNo
    })
    .then(() => {
        setValid(true)
        setComment("유효한 사업자 등록번호 입니다!")
    })
    .catch((err) => {
        setValid(false)
        setComment("유효하지 않은 사업자 등록번호 입니다!")
        console.error(err)
    })
};

// 회원가입 요청
const postSignUp = (email: string, password: string, phoneNumber: string, registeredNo: string) => {
    axios.post(import.meta.env.BASE_URL + "/api/auth", {
        "email": email,
        "password": password,
        "phoneNumber": phoneNumber,
        "registeredNo": registeredNo
    })
}

export { postEmailCheck, postCheckRegisterNo }