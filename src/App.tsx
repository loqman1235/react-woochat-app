import { Route, Routes } from "react-router-dom";
import ChatLayout from "./layouts/ChatLayout";
import { LoginPage, RegisterPage } from "./pages/Auth";
import AppLayout from "./layouts/AppLayout";
import { RoomsPage } from "./pages/Rooms";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<RoomsPage />} />
          <Route path="/chat" element={<ChatLayout />} />
        </Route>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
