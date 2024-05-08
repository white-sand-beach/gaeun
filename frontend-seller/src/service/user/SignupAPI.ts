import axios from "axios";
import { SignupType } from "../../types/SignupType";
// import { useNavigate } from "react-router-dom";

// 이메일 중복 확인
// 중복확인은 err가 없이 200 status code 준다
// true, false로 중복여부 확인한다
const postEmailCheck = ({ email, setValid, setComment }: SignupType) => {
    axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/check-email", {
        "email": email,
    })
        .then((res) => {
            if (res.data.data.isValid === true) {
                console.log(res.data.data.isValid)
                setValid(true)
                setComment("유효한 이메일입니다!")
            }
            else {
                console.log(res.data.data.isValid)
                setValid(false)
                setComment("이미 사용중인 이메일입니다!")
            }
        })
        .catch((err) => {
            console.error(err)
        })
};

// 사업자 등록번호 사용 여부 확인
const postCheckRegisterNo = ({ registeredNo, setValid, setComment }: SignupType) => {
    axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/check-registered-no", {
        "registeredNo": registeredNo
    })
        .then((res) => {
            if (res.data.data.isValid === true) {
                console.log(res.data.data.isValid)
                setValid(true)
                setComment("유효한 사업자 등록번호 입니다!")
            }
            else {
                console.log(res.data.data.isValid)
                setValid(false)
                setComment("유효하지 않은 사업자 등록번호 입니다!")
            }
        })
        .catch((err) => {
            console.error(err)
        })
};

// 회원가입 요청
const postSignUp = ({ email, password, phoneNumber, registeredNo, setValid, setComment }: SignupType) => {
    axios.post(import.meta.env.VITE_BASE_URL + "/api/auth", {
        "email": email,
        "password": password,
        "phoneNumber": phoneNumber,
        "registeredNo": registeredNo
    })
        .then(() => {
            setValid(true)
            setComment("회원가입 성공")
            // navigate("/signupFin")

        })
        .catch((err) => {
            setValid(false)
            setComment("이미 등록된 이메일/등록번호 입니다!")
            console.error(err)
        })
}

export { postEmailCheck, postCheckRegisterNo, postSignUp }