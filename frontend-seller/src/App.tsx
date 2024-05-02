import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./components/ui/Main.tsx";
import LogIn from "./components/login/LogIn.tsx"
import SignUp from "./components/login/SignUp.tsx";
import SignupFinish from "./components/login/SignupFinish.tsx";
import RegisterFood from "./components/foods/RegisterFood.tsx";
import MainLayout from "./components/ui/MainLayout.tsx";

import OrderListPage from "./pages/list/OrderlistPage.tsx";
import NotificationPage from "./pages/notification/NotificationPage.tsx";
import RegisterShopPage from "./pages/shop/RegisterShopPage.tsx";


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
          <Route path="/test/main" element={<OrderListPage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;