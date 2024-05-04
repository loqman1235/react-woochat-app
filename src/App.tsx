import { Navigate, Route, Routes } from "react-router-dom";
import ChatLayout from "./layouts/ChatLayout";
import { LoginPage, RegisterPage, VerifyEmailPage } from "./pages/Auth";
import AppLayout from "./layouts/AppLayout";
import { RoomsPage } from "./pages/Rooms";
import { ProfilePage } from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeContext";
import useAuth from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuth } = useAuth();

  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <AppLayout /> : <Navigate to="/sign-in" />}
          >
            <Route index element={<RoomsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<ChatLayout />} />
          </Route>
          <Route
            path="/sign-in"
            element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!isAuth ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-email/:userId/:token"
            element={<VerifyEmailPage />}
          />
        </Routes>

        <ToastContainer theme="colored" closeButton />
      </ThemeProvider>
    </>
  );
};

export default App;
