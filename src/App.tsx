import "./css/App.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ListingPage } from "./pages/ListingPage";
import { CreatePage } from "./pages/CreatePage";
import { MyListingPage } from "./pages/MyListingPage";
import { MessagePage } from "./pages/MessagePage";
import { ProfilePage } from "./pages/ProfilePage";
import { HelpPage } from "./pages/HelpPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {isLoginPage ? (
        <LoginPage />
      ) : (
        <Dashboard
        activePage={
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/listings" element={<ListingPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/me/listings" element={<MyListingPage />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        }
      />
      )}
    </>
  );
}

export default App;
