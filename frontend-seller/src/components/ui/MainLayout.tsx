// 내부 import
import { Outlet } from "react-router-dom";

// 컴포넌트 import
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const MainLayout = () => {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
};

export default MainLayout;