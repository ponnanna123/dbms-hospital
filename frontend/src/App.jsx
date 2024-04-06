import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";
import PatientUI from "./pages/PatientUI.jsx";
import DoctorUI from "./pages/DoctorUI.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/patient/:id" element={<PatientUI />} />
        <Route path="/doctor/:id" element={<DoctorUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
