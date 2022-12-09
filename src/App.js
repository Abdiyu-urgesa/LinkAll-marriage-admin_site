import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import AppUsers from "./scenes/appUsers";
import AdminUsers from "./scenes/adminUsers";
import Business from "./scenes/businessUsers";
import Bar from "./scenes/bar";
import EditUser from "./scenes/edituser";
import Line from "./scenes/line";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignIn from "./scenes/login";
import AuthContext from "./config/store/auth-context";
import OtpLogin from "./scenes/loginOtp";
import Posts from "./scenes/posts";
import Dropdowns from "./scenes/dropDowns";
import Feedback from "./scenes/feedback";
import EditDropdown from "./scenes/dropDowns/editDropdown";
import AddField from "./scenes/dropDowns/addField";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const [showside, setshowside] = useState(true);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/otp")) {
      setshowside(false);
    } else {
      setshowside(true);
    }
  }, [location.pathname]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showside && authCtx.isLoggedIn && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {showside && authCtx.isLoggedIn && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/otp/:id" element={<OtpLogin />} />
              {authCtx.isLoggedIn && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<AppUsers />} />
                  <Route path="/businessusers" element={<Business />} />
                  <Route path="/adminusers" element={<AdminUsers />} />
                  <Route path="/edituser/:id" element={<EditUser />} />

                  <Route path="/posts" element={<Posts />} />

                  <Route path="/dropdowns" element={<Dropdowns />} />
                  <Route path="/editdropdown/:id" element={<EditDropdown />} />
                  <Route path="/addfield/:id" element={<AddField />} />

                  <Route path="/bar" element={<Bar />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<Feedback />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
