import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import Profile from "./pages/Profile.jsx";
import Welcome from "./pages/Welcome.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PrivateProfile from "./components/PrivateProfile.jsx";
import PrivatePatient from "./components/PrivatePatient.jsx";
import PrivateDoctor from "./components/PrivateDoctor.jsx";
import PrivateWelcome from "./components/PrivateWelcome.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route element={<PrivateWelcome />}>
          <Route path="/welcome" element={<Welcome />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivatePatient />}>
          <Route path="/patient" element={<PatientDashboard />} />
        </Route>
        <Route element={<PrivateDoctor />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Route>
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route element={<PrivateProfile />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
