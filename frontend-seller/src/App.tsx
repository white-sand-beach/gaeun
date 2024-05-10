import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./components/ui/Main.tsx";
import LogIn from "./pages/user/LogInPage.tsx"
import SignUp from "./pages/user/SignupPage.tsx";
import RegisterFood from "./components/foods/RegisterFood.tsx";
import MainLayout from "./components/ui/MainLayout.tsx";

import OrderListPage from "./pages/order/OrderlistPage.tsx";
// import OrderdetailPage from "./pages/order/OrderdetailPage.tsx";
import OrderDetail from "./components/order/OrderDetail.tsx";
import NotificationPage from "./pages/notification/NotificationPage.tsx";
import RegisterShopPage from "./pages/shop/RegisterShopPage.tsx";
import SaleslistPage from "./pages/sales/SaleslistPage.tsx";
import ReviewPage from "./pages/review/ReviewPage.tsx";
import MyPage from "./pages/user/MyPage.tsx";


const App = () => {

  // 브라우저 종료하면 로컬스토리지 클리어
  window.addEventListener("unload", () => {
    localStorage.clear()
  })
  
  return (
    <BrowserRouter basename="/seller">
      <MainLayout />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register/shop" element={<RegisterShopPage />} />
          <Route path="/register/food" element={<RegisterFood />} />
          <Route path="/order" element={<OrderListPage />} />
          <Route path="/order/:orderNum" element={<OrderDetail />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/sales" element={<SaleslistPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;