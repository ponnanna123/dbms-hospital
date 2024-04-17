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
import PrivateWelcome from "./components/PrivateWelcome.jsx";
import CreateAppointment from "./pages/CreateAppointment.jsx";
import SignOut from "./pages/SignOut.jsx";
import PrivateSignInUp from "./components/PrivateSignInUp.jsx";
import PrivateUser from "./components/PrivateUser.jsx";
import PrivateDashboard from "./components/PrivateDashboard.jsx";
import ConfirmDelete from "./pages/ConfirmDelete.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        {/* Redirecting from HomePage */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Private Routes */}
        <Route element={<PrivateWelcome />}>
          <Route path="/welcome" element={<Welcome />} />
        </Route>
        <Route element={<PrivateSignInUp />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<PrivateDashboard />}>
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Route>
        <Route element={<PrivateUser />}>
          <Route path="/confirm-delete" element={<ConfirmDelete />} />
          <Route path="/new-appointment" element={<CreateAppointment />} />
          <Route path="/appointments" element={<CreateAppointment />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
