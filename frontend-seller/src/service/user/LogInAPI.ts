import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginType } from "../../types/user/LoginType";
import Cookies from "universal-cookie";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import RegisterFCMToken from "../fcm/RegisterFCMToken";

const LoginAPI = () => {
    const cookies = new Cookies()
    const navigate = useNavigate();

    // firebase 설정
    const vapidKey = import.meta.env.VITE_FCM_VAPID_KEY;
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FCM_API_KEY,
        authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FCM_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FCM_APP_ID,
        measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    const postSellerLogin = ({ email, password }: LoginType) => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/login", formData, {
            withCredentials: true
        })
            .then((res) => {
                // 로그인 성공하면 accessToken을 cookie에 저장
                console.log("로그인 성공")
                cookies.set("accessToken", res.headers.authorization, { path: "/" })
                // 로그인 성공했을 때, FCM 토큰을 얻어온다.
                getToken(messaging, { vapidKey: `${vapidKey}` })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log("로그인 하면서 FCM 토큰 받았습니다.")
                            console.log(currentToken)
                            cookies.set("fcm-token", currentToken)
                            RegisterFCMToken(currentToken, res.headers.authorization)
                        }
                    })
                    .catch((err) => {
                        console.error("FCM토큰 에러: ", err)
                    })
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