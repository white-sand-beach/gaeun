import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageLayout from "./components/navbar/PageLayout";
import Main from "./pages/main/MainPage";
import Profile from "./pages/accounts/Profile";
import Cart from "./pages/cart/Cart";
import AddCart from "./pages/cart/AddCart";
import Notification from "./pages/notification/Notification";
import Favorite from "./pages/favorite/Favorite";
import OrderDetail from "./pages/order/OrderDetail";
import OrderList from "./pages/order/OrderList";
import OrderState from "./pages/order/OrderState";
import SearchPage from "./pages/search/SearchPage";
import ProfileSetting from "./pages/accounts/ProfileSetting";
import Login from "./pages/accounts/Login";
import Shop from "./pages/shop/Shop";
import SignUp from "./pages/accounts/SignUp";
import AddressSearchPage from "./components/address/AddressSearchPage";
import AddressRegistration from "./components/address/AddressRegistration";
import MyReview from "./pages/shop/MyReview";
import LoginCallbaak from "./components/auth_login/LoginCallback";
import AddressCorrection from "./components/address/AddressCorrection";
import LoadingPage from "./components/loading/LoadingPage";
import Payment from "./pages/order/Payment";
import Cookies from "universal-cookie";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import RegisterFCM from "./services/fcm/RegisterFCM";

const queryClient = new QueryClient();

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
  if ("Notification" in window) {
    window.Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("알림 권한이 부여됐습니다.")
        }
        else {
          console.log("권한 부여 실패")
        }
      });
  } else {
    console.error("이 브라우저는 알림 지원 안해요")
  }

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
        const response = await RegisterFCM(token)
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
    alert(`${payload.notification?.title} \n ${payload.notification?.body}`)
  })
  return (
    <BrowserRouter basename="/consumer">
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <PageLayout />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-callback" element={<LoginCallbaak />} />
          <Route path="payment-callback" element={<Payment />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-cart" element={<AddCart />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/order-state" element={<OrderState />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/profile" element={<Profile />} />.
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/shop/:Id" element={<Shop />} />
          <Route path="/address-search" element={<AddressSearchPage />} />
          <Route
            path="/address-search-registration"
            element={<AddressRegistration />}
          />
          <Route path="/my-review" element={<MyReview />} />
          <Route path="/address-correction" element={<AddressCorrection />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
