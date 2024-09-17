import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./components/Home";
import Contact_us from "./components/Contact_us";
import About_us from "./components/About_us";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import Projects from "./components/Projects";
import SignUp from "./components/SignUp";
import VideoGrid from "./components/Vedio";
import Dashboard from "./Admin/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {/* Client Routes */}
      <Route
        path="/"
        element={
          <ClientLayout>
            <Home />
          </ClientLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <ClientLayout>
            <Contact_us />
          </ClientLayout>
        }
      />
      <Route
        path="/about"
        element={
          <ClientLayout>
            <About_us />
          </ClientLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPass" element={<ForgotPass />} />
      <Route
        path="/projects"
        element={
          <ClientLayout>
            <Projects />
          </ClientLayout>
        }
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/testimony"
        element={
          <ClientLayout>
            <VideoGrid />
          </ClientLayout>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/Dashboard" element={<AdminLayout></AdminLayout>} />
    </Routes>
  );
};

export default App;
