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
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import RegisterFCMToken from "./service/fcm/RegisterFCMToken.ts";

const App = () => {
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")

  // firebase 설정
  const vapidKey = import.meta.env.VITE_FCM_VAPID_KEY;
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

  // FCM 사용을 위한 토큰 요청
  getToken(messaging, { vapidKey: `${vapidKey}` })
    .then((currentToken) => {
      if (currentToken) {
        console.log("FCM 토큰 받았습니다")
        console.log(currentToken)
        saveToken(currentToken)
      }
      else {
        console.log("등록된 토큰이 없습니다. 다시 요청하세요")
      }
    }).catch((err) => {
      console.error(err)
    })

  // FCM 토큰 저장
  const saveToken = async (token: string) => {
    cookies.set("fcm-token", token)
    try {
      // accessToken 있는 경우에 토큰 저장 api 요청
      if (accessToken) {
        const response = await RegisterFCMToken(token)
        console.log(response)
        return response
      }
    }
    catch (err) {
      console.error(err)
      throw err
    }
  };

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