import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Main from "./components/ui/Main.tsx";
import LogIn from "./pages/user/LogInPage.tsx";
import SignUp from "./pages/user/SignupPage.tsx";
import MainLayout from "./components/ui/MainLayout.tsx";

import InprogressListPage from "./pages/order/InprogressListPage.tsx";
import NotificationPage from "./pages/notification/NotificationPage.tsx";
import RegisterShopPage from "./pages/shop/RegisterShopPage.tsx";
import RegisterFoodPage from "./pages/foods/RegisterFoodPage.tsx";
import ShopInfoPage from "./pages/shop/ShopInfoPage.tsx";
import MenuListPage from "./pages/menu/MenuListPage.tsx";
import FinishListPage from "./pages/order/FinishListPage.tsx";
import Cookies from "universal-cookie";
import UpdateFoodPage from "./pages/foods/UpdateFoodPage.tsx";
import OrderDetailPage from "./pages/order/OrderInfoPage.tsx";
import StatisticsPage from "./pages/statistics/StatisticsPage.tsx";

import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("알림 권한이 부여됐습니다.");
  } else {
    console.log("권한 부여 실패");
  }
});

const App = () => {
  const navigate = useNavigate();
  // 창 종료하면 모든 데이터 클리어
  window.addEventListener("unload", () => {
    localStorage.clear();
    cookies.remove("accessToken");
    cookies.remove("fcm-token");
    cookies.remove("storeId");
  });

  const cookies = new Cookies();

  onMessage(messaging, (payload) => {
    if (payload.data?.title.includes("알림")) {
      console.log("알림 왓다1");
      toast("🍳주문 알림이 왔어요!", {
        position: "top-right",
        autoClose: 10 * 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { width: "280px", height: "80px"},
        progress: undefined,
        theme: "light",
        transition: Flip,
        onClick: () => {
          navigate("/order");
        },
      });
    } else if (payload.data?.title.includes("편지")) {
      console.log("알림 왓다1");
      toast("✉편지가 도착했어요!", {
        position: "top-right",
        autoClose: 10 * 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { width: "280px", height: "80px"},
        progress: undefined,
        theme: "light",
        transition: Flip,
        onClick: () => {
          navigate("/mystore");
        },
      });
    }
  });

  return (
    <div>
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
        <Route path="/sales" element={<FinishListPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/mystore" element={<ShopInfoPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

const RootApp = () => {
  return (
    <BrowserRouter basename="/seller">
      <MainLayout />
      <App />
    </BrowserRouter>
  );
};

export default RootApp;
