import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import Projects from "./components/Projects";
import SignUp from "./components/SignUp";
import VideoGrid from "./components/Vedio";
import AdminPanelVedio from "./Admin/AdminPanelVedio";
import Dashboard from "./Admin/Dashboard";
import ProjectAdd from "./Admin/Projectadd";
import AdminQuestions from "./Admin/AdminQuestions";
import NotFoundPage from "./components/NotFoundPage";
import Question from "./components/Question";
import Profile from "./components/Profile";
import ProjectDetails from "./components/ProjectDetails";
import Security from "./components/security";

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
        path="/login"
        element={
          <ClientLayout>
            <Login />
          </ClientLayout>
        }
      />
      <Route
        path="Security"
        element={
          <ClientLayout>
            <Security />
          </ClientLayout>
        }
      />
      <Route
        path="/question"
        element={
          <ClientLayout>
            <Question />
          </ClientLayout>
        }
      />
      <Route path="/forgotPass" element={<ForgotPass />} />
      <Route
        path="/projects"
        element={
          <ClientLayout>
            <Projects />
          </ClientLayout>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <ClientLayout>
            <ProjectDetails />
          </ClientLayout>
        }
      />
      <Route
        path="/signUp"
        element={
          <ClientLayout>
            <SignUp />
          </ClientLayout>
        }
      />
      <Route
        path="/Profile"
        element={
          <ClientLayout>
            <Profile />
          </ClientLayout>
        }
      />
      <Route
        path="/testimony"
        element={
          <ClientLayout>
            <VideoGrid />
          </ClientLayout>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/Dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/AdminPanelVideo"
        element={
          <AdminLayout>
            <AdminPanelVedio />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/Project"
        element={
          <AdminLayout>
            <ProjectAdd />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/Questions"
        element={
          <AdminLayout>
            <AdminQuestions />
          </AdminLayout>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
