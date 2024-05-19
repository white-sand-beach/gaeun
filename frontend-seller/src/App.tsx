import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./components/ui/Main.tsx";
import LogIn from "./pages/user/LogInPage.tsx"
import SignUp from "./pages/user/SignupPage.tsx";
import MainLayout from "./components/ui/MainLayout.tsx";

import InprogressListPage from "./pages/order/InprogressListPage.tsx";
import NotificationPage from "./pages/notification/NotificationPage.tsx";
import RegisterShopPage from "./pages/shop/RegisterShopPage.tsx";
import RegisterFoodPage from "./pages/foods/RegisterFoodPage.tsx";
import SaleslistPage from "./pages/sales/SaleslistPage.tsx";
import ShopInfoPage from "./pages/shop/ShopInfoPage.tsx";
import MenuListPage from "./pages/menu/MenuListPage.tsx";
import Cookies from "universal-cookie";
import UpdateFoodPage from "./pages/foods/UpdateFoodPage.tsx";
import OrderDetailPage from "./pages/order/OrderInfoPage.tsx";
import StatisticsPage from "./pages/statistics/StatisticsPage.tsx";

import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const App = () => {
  // 창 종료하면 모든 데이터 클리어
  window.addEventListener("unload", () => {
    localStorage.clear();
    cookies.remove("accessToken");
    cookies.remove("fcm-token");
    cookies.remove("storeId");
  });

  const cookies = new Cookies()

  // firebase 설정
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

  // 권한 요청
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("알림 권한이 부여됐습니다.")
      }
      else {
        console.log("권한 부여 실패")
      }
    });

  onMessage(messaging, (payload) => {
    console.log("메시지 받았어요", payload)
    alert(`${payload.data?.title} \n ${payload.data?.body}`)
  })


  return (
    <BrowserRouter basename="/seller">
      <MainLayout />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register-shop" element={<RegisterShopPage />} />
        <Route path="/register-food" element={<RegisterFoodPage />} />
        <Route path="/update/food/:menuId" element={<UpdateFoodPage />} />
        <Route path="/order" element={<InprogressListPage />} />
        <Route path="/order/:orderInfoId" element={<OrderDetailPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/menus" element={<MenuListPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/sales" element={<SaleslistPage />} />
        <Route path="/mystore" element={<ShopInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;