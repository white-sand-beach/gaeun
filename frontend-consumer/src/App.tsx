import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageLayout from "./components/navbar/PageLayout";
import Main from "./pages/main/Main";
import Profile from "./pages/mypage/Profile";
import Cart from "./pages/cart/Cart";
import Alarm from "./pages/alarm/Alarm";
import Favorite from "./pages/favorite/Favorite";
import OrderDetail from "./pages/order/OrderDetail";
import OrderList from "./pages/order/OrderList";
import OrderState from "./pages/order/OrderState";
import SearchPage from "./pages/search/SearchPage";
import ProfileSetting from "./pages/mypage/ProfileSetting";
import Login from "./pages/accounts/Login";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter basename="/consumer">
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <PageLayout />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />.
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-state" element={<OrderState />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ProfileSetting" element={<ProfileSetting />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-state" element={<OrderState />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
