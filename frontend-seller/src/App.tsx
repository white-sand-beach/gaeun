// 내부 import
import { BrowserRouter, Routes, Route } from "react-router-dom"

// 컴포넌트 import
import Main from "./components/ui/Main.tsx";
import LogIn from "./components/login/LogIn.tsx"
import SignUp from "./components/login/SignUp.tsx";
import SignupFinish from "./components/login/SignupFinish.tsx";
import RegisterShop from "./components/shops/RegisterShop.tsx";
import RegisterFood from "./components/foods/RegisterFood.tsx";
import ListOrder from "./components/list/ListOrder.tsx";
import AlarmPage from "./components/alarm/AlarmPage.tsx";

import MainLayout from "./components/ui/MainLayout.tsx";


const App = () => {
  return (
    <BrowserRouter basename="/seller">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupFin" element={<SignupFinish />} />
          <Route path="/register/shop" element={<RegisterShop />} />
          <Route path="/register/food" element={<RegisterFood />} />
          <Route path="/test/main" element={<ListOrder />} />
          <Route path="/alarm" element={<AlarmPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;