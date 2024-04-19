import { Route, Routes } from "react-router-dom";
import ChatLayout from "./layouts/ChatLayout";
import { ThemeProvider } from "./context/ThemeContext";
import { LoginPage, RegisterPage } from "./pages/Auth";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<ChatLayout />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
