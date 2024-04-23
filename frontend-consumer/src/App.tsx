import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route/>
      </Routes>
      <div className="text-3xl text-orange-500 font-extrabold">
        <h1>Hello, world!</h1>
      </div>
    </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
