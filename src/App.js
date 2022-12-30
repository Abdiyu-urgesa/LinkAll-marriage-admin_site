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
import AddDropdown from "./scenes/dropDowns/addDropdown";
import LoadingBar from "react-top-loading-bar";
import CreateBusinessUser from "./scenes/businessUsers/createBusinessUser";
import CreateAdminUser from "./scenes/adminUsers/createAdminUser";
import Catagories from "./scenes/posts/catagories";
import Tags from "./scenes/posts/tags";
import CreatCatagory from "./scenes/posts/catagories/createCatagory";
import EditCatagory from "./scenes/posts/catagories/editCatagory";
import EditTag from "./scenes/posts/tags/editTag";
import CreatTag from "./scenes/posts/tags/createTag";
import CreatPost from "./scenes/posts/createPost";
import Points from "./scenes/points_payments/points";
import CreatePoint from "./scenes/points_payments/points/createPoint";
import EditPoint from "./scenes/points_payments/points/editPoint";
import CreditPackage from "./scenes/points_payments/credits";
import CreateCreditpackage from "./scenes/points_payments/credits/create";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const [showside, setshowside] = useState(true);
  const [progress, setProgress] = useState(0);
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
        <LoadingBar
          color="#1cbe8e"
          progress={progress}
          height={3}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="app">
          {showside && authCtx.isLoggedIn && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {showside && authCtx.isLoggedIn && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/" element={<SignIn isloading={setProgress} />} />
              <Route
                path="/otp/:id"
                element={<OtpLogin isloading={setProgress} />}
              />
              {authCtx.isLoggedIn && (
                <>
                  <Route
                    path="/dashboard"
                    element={<Dashboard isloading={setProgress} />}
                  />
                  <Route
                    path="/users"
                    element={<AppUsers isloading={setProgress} />}
                  />
                  <Route
                    path="/businessusers"
                    element={<Business isloading={setProgress} />}
                  />
                  <Route
                    path="/createbusiness"
                    element={<CreateBusinessUser isloading={setProgress} />}
                  />
                  <Route
                    path="/createadmin"
                    element={<CreateAdminUser isloading={setProgress} />}
                  />
                  <Route
                    path="/adminusers"
                    element={<AdminUsers isloading={setProgress} />}
                  />
                  <Route
                    path="/edituser/:id"
                    element={<EditUser isloading={setProgress} />}
                  />

                  <Route
                    path="/posts"
                    element={<Posts isloading={setProgress} />}
                  />
                  <Route
                    path="/createposts"
                    element={<CreatPost isloading={setProgress} />}
                  />
                  <Route
                    path="/catagories"
                    element={<Catagories isloading={setProgress} />}
                  />
                  <Route
                    path="/createcatagory"
                    element={<CreatCatagory isloading={setProgress} />}
                  />
                  <Route
                    path="/editcatagory/:id"
                    element={<EditCatagory isloading={setProgress} />}
                  />
                  <Route
                    path="/tags"
                    element={<Tags isloading={setProgress} />}
                  />
                  <Route
                    path="/creattags"
                    element={<CreatTag isloading={setProgress} />}
                  />
                  <Route
                    path="/edittag/:id"
                    element={<EditTag isloading={setProgress} />}
                  />

                  <Route
                    path="/dropdowns"
                    element={<Dropdowns isloading={setProgress} />}
                  />
                  <Route
                    path="/addDropdown"
                    element={<AddDropdown isloading={setProgress} />}
                  />
                  <Route
                    path="/editdropdown/:id"
                    element={<EditDropdown isloading={setProgress} />}
                  />
                  <Route
                    path="/addfield/:id"
                    element={<AddField isloading={setProgress} />}
                  />

                  <Route
                    path="/bar"
                    element={<Bar isloading={setProgress} />}
                  />
                  <Route
                    path="/line"
                    element={<Line isloading={setProgress} />}
                  />
                  <Route
                    path="/faq"
                    element={<Feedback isloading={setProgress} />}
                  />
                  <Route
                    path="/points"
                    element={<Points isloading={setProgress} />}
                  />
                  <Route
                    path="/createpoints"
                    element={<CreatePoint isloading={setProgress} />}
                  />
                  <Route
                    path="/updatepoints/:id/:point/:point_type/"
                    element={<EditPoint isloading={setProgress} />}
                  />
                  <Route
                    path="/credit-packages"
                    element={<CreditPackage isloading={setProgress} />}
                  />
                  <Route
                    path="/create-credit-package"
                    element={<CreateCreditpackage isloading={setProgress} />}
                  />
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
