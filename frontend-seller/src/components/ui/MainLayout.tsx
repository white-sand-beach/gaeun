import { Outlet, useLocation } from "react-router-dom";
import Header from "../ui/Header.tsx";
import Footer from "../ui/Footer.tsx";

const MainLayout = () => {
    // 상단바 숨길 페이지 path
    const hiddenHeader = [""];

    // 하단바 숨길 페이지 path
    const hiddeneFooter = ["/login", "/signup", "/notification", "/register/shop", "/register/food"];

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