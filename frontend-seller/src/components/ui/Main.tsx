import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Main = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const accessToken = cookies.get("accessToken")
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    })
    return (
        <div className="flex text-5xl items-center justify-center w-screen h-screen">
            환영 합니다!
        </div>
    );
};

export default Main;