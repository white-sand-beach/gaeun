import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

// 상단바를 숨기고 싶은 경로 목록
const hideNavBarLayoutPaths = [
  "/login",
  "/address-search",
  "/address-search-registration",
  "/address-correction",
];
// 하단바를 숨기고 싶은 경로 목록
const hideFooterLayoutPaths = [
  "/login",
  "/cart",
  "/add-cart",
  "/alarm",
  "/order-list",
  "/order-detail",
  "/order-state",
  "/search",
  "/sign-up",
  "/address-search-registration",
  "/my-review",
  "/address-correction",
  "/profile-setting",
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
