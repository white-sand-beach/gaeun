import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();

    let title = "";
    switch (location.pathname) {
        case "/":
            title = "메인";
            break;
        case "/login":
            title = "로그인";
            break;
        case "/signup":
            title = "회원가입";
            break;
        case "/test/main":
            title = "주문현황";
            break;
        case "/notification":
            title = "알림"
            break;
    }
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
};

export default Header;