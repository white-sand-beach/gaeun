import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="text-3xl text-orange-500 font-extrabold">
        <h1>Hello, world!</h1>
      </div>
    </QueryClientProvider>
  );
};

export default App;
