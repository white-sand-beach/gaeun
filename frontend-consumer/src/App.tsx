import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageLayout from "./components/navbar/PageLayout";
import Cart from "./pages/Cart";
import Alarm from "./pages/Alarm";
import Favorite from "./pages/Favorite"
import OrderDatail from "./pages/order/OrderDatail"
import OrderList from "./pages/order/OrderList"

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <PageLayout/>
        <Routes>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/alarm" element={<Alarm/>} />
          <Route path="/favorite" element={<Favorite/>} />
          <Route path="/order-detail" element={<OrderDatail/>} />
          <Route path="/order-list" element={<OrderList/>} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;