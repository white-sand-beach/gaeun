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

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter basename="/consumer">
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <PageLayout />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-callback" element={<LoginCallbaak />} />
          <Route path="/sign-up" element={<SignUp />} />
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
