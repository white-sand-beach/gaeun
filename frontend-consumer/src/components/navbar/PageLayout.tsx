import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

// 상단바를 숨기고 싶은 경로 목록
const hideNavBarLayoutPaths = [
  "/login",
  "/address-search",
  "/address-search-registration",
  "/address-correction",
  "/loading",
];
// 하단바를 숨기고 싶은 경로 목록
const hideFooterLayoutPaths = [
  "/login",
  "/cart",
  "/add-cart",
  "/notification",
  "/order-detail",
  "/order-state",
  "/sign-up",
  "/address-search-registration",
  "/my-review",
  "/address-correction",
  "/profile",
  "/profile-setting",
  "/loading",
  "/shop/:Id",
];

const PageLayout = () => {
  const location = useLocation();
  const showNavBarLayout = !hideNavBarLayoutPaths.includes(location.pathname);
  const showFooterLayout = !hideFooterLayoutPaths.includes(location.pathname);

  return (
    <div>
      {showNavBarLayout && <NavBar />}
      {showFooterLayout && <Footer />}
    </div>
  );
};

export default PageLayout;
