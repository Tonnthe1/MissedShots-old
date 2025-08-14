import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  Navigate
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewNetwork from "./pages/NewNetwork";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import MyAccount from "./pages/MyAccount";

// New PrivateRoute component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token') !== null; // You might want to use a more robust auth check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home";
        metaDescription = "Home page";
        break;
      case "/login":
        title = "Login";
        metaDescription = "Login to your account";
        break;
      case "/sign-up":
        title = "Sign Up";
        metaDescription = "Create a new account";
        break;
      case "/new-network":
        title = "New Network";
        metaDescription = "View your network connections";
        break;
      case "/personal-info":
        title = "Personal Info";
        metaDescription = "View personal information";
        break;
      case "/my-account":
        title = "My Account";
        metaDescription = "Manage your account";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/new-network" element={<PrivateRoute><NewNetwork /></PrivateRoute>} />
      <Route path="/personal-info/:id" element={<PrivateRoute><PersonalInfoPage /></PrivateRoute>} />
      <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;