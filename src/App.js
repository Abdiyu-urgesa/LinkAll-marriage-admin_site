import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import AppUsers from "./scenes/appUsers";
import AdminUsers from "./scenes/adminUsers";
import BusinessUsers from "./scenes/businessUsers";
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
import AppFeedBack from "./scenes/feedback/feedback";
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
import EditPost from "./scenes/posts/editPost";
import UpdateCreditPackage from "./scenes/points_payments/credits/update";
import QuizeList from "./scenes/quizes";
import UpdateQuize from "./scenes/quizes/detail";
import CreateQuizes from "./scenes/quizes/create";
import PossibleQuizeAnswers from "./scenes/quizes/possibleAnswers";
import ChatActivityTarrif from "./scenes/points_payments/charge-fee";
import UpdateChatActivityTarrif from "./scenes/points_payments/charge-fee/update";
import CreateActivityTarrif from "./scenes/points_payments/charge-fee/create";
import AbuseReport from "./scenes/feedback/abuse_report";
import ServiceCompanies from "./scenes/points_payments/serviceCompany";
import CreateCompanyService from "./scenes/points_payments/serviceCompany/create";
import UpdateCompanyService from "./scenes/points_payments/serviceCompany/update";
import CustomAds from "./scenes/points_payments/ad";
import UpdateAd from "./scenes/points_payments/ad/update";
import CreateCustomAd from "./scenes/points_payments/ad/create";
import ChatTextList from "./scenes/chatText";
import CreateChatTextList from "./scenes/chatText/create";
import UpdateChatTextList from "./scenes/chatText/detail";
import ChatTextDetail from "./scenes/chatText/chatText";
import PaymentAccount from "./scenes/points_payments/payments";
import CreatePaymentAccount from "./scenes/points_payments/payments/create";
import UpdatePaymentAccount from "./scenes/points_payments/payments/update";
import CreditPayments from "./scenes/points_payments/payments/payment_info";
import PrivateRoutes from "./config/store/PrivateRoutes";
import { SocketContextProvider } from "./config/api/socketHelpers";
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
  console.log(authCtx.isLoggedIn);
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
            <SocketContextProvider>
              <Routes>
                <Route path="/" element={<SignIn isloading={setProgress} />} />
                <Route
                  path="/otp/:id"
                  element={<OtpLogin isloading={setProgress} />}
                />
                {/* all routes under this private route require login */}

                <Route element={<PrivateRoutes />}>
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
                    element={<BusinessUsers isloading={setProgress} />}
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
                    path="/edituser/:id/:next"
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
                    path="/editpost/:id"
                    element={<EditPost isloading={setProgress} />}
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
                    path="/feedback"
                    element={<AppFeedBack isloading={setProgress} />}
                  />
                  <Route
                    path="/abuse-report"
                    element={<AbuseReport isloading={setProgress} />}
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
                  <Route
                    path="/update-credit-package/:id/"
                    element={<UpdateCreditPackage isloading={setProgress} />}
                  />
                  <Route
                    path="/company-services"
                    element={<ServiceCompanies isloading={setProgress} />}
                  />
                  <Route
                    path="/create-company-services"
                    element={<CreateCompanyService isloading={setProgress} />}
                  />
                  <Route
                    path="/update-company-services/:id/"
                    element={<UpdateCompanyService isloading={setProgress} />}
                  />
                  <Route
                    path="/custom-ads"
                    element={<CustomAds isloading={setProgress} />}
                  />
                  <Route
                    path="/create-ads"
                    element={<CreateCustomAd isloading={setProgress} />}
                  />
                  <Route
                    path="/update-ads/:id/"
                    element={<UpdateAd isloading={setProgress} />}
                  />
                  <Route
                    path="/activity-tarrifs"
                    element={<ChatActivityTarrif isloading={setProgress} />}
                  />
                  <Route
                    path="/create-activity-tarrifs"
                    element={<CreateActivityTarrif isloading={setProgress} />}
                  />
                  <Route
                    path="/update-activity-tarrif/:id/:tarrif/:action_type/"
                    element={
                      <UpdateChatActivityTarrif isloading={setProgress} />
                    }
                  />

                  <Route
                    path="/quizes"
                    element={<QuizeList isloading={setProgress} />}
                  />
                  <Route
                    path="/create-quize"
                    element={<CreateQuizes isloading={setProgress} />}
                  />
                  <Route
                    path="/quize-detail/:id/"
                    element={<UpdateQuize isloading={setProgress} />}
                  />
                  <Route
                    path="/create-possibleAnswers/:id/"
                    element={<PossibleQuizeAnswers isloading={setProgress} />}
                  />
                  <Route
                    path="/chat-text-list"
                    element={<ChatTextList isloading={setProgress} />}
                  />
                  <Route
                    path="/create-chat-text-list"
                    element={<CreateChatTextList isloading={setProgress} />}
                  />
                  <Route
                    path="/edit-chat-text-list/:id/"
                    element={<UpdateChatTextList isloading={setProgress} />}
                  />
                  <Route
                    path="/chat-text/:id/"
                    element={<ChatTextDetail isloading={setProgress} />}
                  />
                  <Route
                    path="/payment-accounts"
                    element={<PaymentAccount isloading={setProgress} />}
                  />
                  <Route
                    path="/create-payment-accounts"
                    element={<CreatePaymentAccount isloading={setProgress} />}
                  />
                  <Route
                    path="/update-payment-account/:id/"
                    element={<UpdatePaymentAccount isloading={setProgress} />}
                  />
                  <Route
                    path="/credit-payment/:status/"
                    element={<CreditPayments isloading={setProgress} />}
                  />
                </Route>
              </Routes>
            </SocketContextProvider>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
