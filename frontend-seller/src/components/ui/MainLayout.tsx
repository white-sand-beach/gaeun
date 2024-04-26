// 내부 import
import { Outlet, useLocation } from "react-router-dom";

// 컴포넌트 import
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const MainLayout = () => {
    // 상단바 숨길 페이지 path
    const hiddenHeader = [""];

    // 하단바 숨길 페이지 path
    const hiddeneFooter = ["/login", "/signup", "/test/main"];

    const location = useLocation()
    const showHeader = !hiddenHeader.includes(location.pathname);
    const showFooter = !hiddeneFooter.includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <Outlet />
            {showFooter && <Footer />}
        </>
    );
};

export default MainLayout;