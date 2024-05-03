import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./components/ui/Main.tsx";
import LogIn from "./pages/user/LogInPage.tsx"
import SignUp from "./components/login/SignUp.tsx";
import SignupFinish from "./components/login/SignupFinish.tsx";
import RegisterFood from "./components/foods/RegisterFood.tsx";
import MainLayout from "./components/ui/MainLayout.tsx";

import OrderListPage from "./pages/order/OrderlistPage.tsx";
import NotificationPage from "./pages/notification/NotificationPage.tsx";
import RegisterShopPage from "./pages/shop/RegisterShopPage.tsx";
import SaleslistPage from "./pages/sales/SaleslistPage.tsx";


const App = () => {
  return (
    <BrowserRouter basename="/seller">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupFin" element={<SignupFinish />} />
          <Route path="/register/shop" element={<RegisterShopPage />} />
          <Route path="/register/food" element={<RegisterFood />} />
          <Route path="/order" element={<OrderListPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/sales" element={<SaleslistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;