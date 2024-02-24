import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneratePdfPage from "./pages/GeneratePDF/GeneratePdf";
import Home from "./pages/Home/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<GeneratePdfPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
