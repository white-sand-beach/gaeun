import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginType } from "../../types/user/LoginType";
import Cookies from "universal-cookie";

const LoginAPI = () => {
    const cookies = new Cookies()
    const navigate = useNavigate();
    const postSellerLogin = ({email, password}: LoginType) => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/login", formData, {
            withCredentials: true
        })
        .then((res) => {
            cookies.set("accessToken", res.headers.authorization, {path: "/"})
            console.log("로그인 성공")
            navigate("/")
        })
        .catch(err => {
            console.error(err)
        })
    };

    return {
        postSellerLogin
    };
};

export default LoginAPI;