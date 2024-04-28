import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageLayout from "./components/navbar/PageLayout";
import Cart from "./pages/cart";
import Main from "./pages/main/Main";
import Profile from "./pages/mypage/Profile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <PageLayout />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />.
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
