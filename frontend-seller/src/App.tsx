// 내부 import
import { BrowserRouter, Routes, Route } from "react-router-dom"

// 컴포넌트 import
import LogIn from "./components/login/LogIn.tsx"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;