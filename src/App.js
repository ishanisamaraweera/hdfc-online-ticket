import "react-progress-2/main.css";
import "./assets/css/Dashboard.css";
import "./assets/css/Header.css";
import "./assets/css/Login.css";
import "./assets/css/MenuSideBar.css";
import "./assets/css/Responsive.css";
import "./assets/css/ThemeChange.css";
import Progress from "react-progress-2";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import AddTicket from "./components/Tickets/AddTicket";
import UpdateTicket from "./components/Tickets/UpdateTicket";
import ViewTicket from "./components/Tickets/ViewTicket";
import AddUser from "./components/User/AddUser";
import NotFount from "./errorPage/404";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Login from "./pages/Login";
import IssueType from "./pages/IssueType";
import IssueCategory from "./pages/IssueCategory";
import Settings from "./pages/Settings";
import AddIssueType from "./components/IssueType/AddIssueType";
import Function from "./pages/Function";
import AddFunction from "./components/User/AddFunction";
import AssignFunction from "./components/User/AssignFunction.js";
import ViewUser from "./components/User/ViewUser.js";
import UpdateUser from "./components/User/UpdateUser.js";
import User from "./pages/User.js";
import UserRole from "./pages/UserRole.js";
import ViewUserRole from "./components/User/ViewUserRole.js";
import UpdateUserRole from "./components/User/UpdateUserRole.js";
import AddUserRole from "./components/User/AddUserRole.js";
import ViewFunction from "./components/User/ViewFunction.js";
import UpdateFunction from "./components/User/UpdateFunction.js";
import AddIssueCategory from "./components/IssueCategory/AddIssueCategory.js";
import ViewIssueCategory from "./components/IssueCategory/ViewIssueCategory.js";
import UpdateIssueCategory from "./components/IssueCategory/UpdateIssueCategory.js";
import GenerateReport from "./pages/GenerateReport.js";
import AppMenu from "./components/SideBar/AppMenu.js";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  const updateExpireTime = () => {
    const expireTime = Date.now() + 60000;
    localStorage.setItem("expireTime",expireTime);
  }
  
  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");    
  
    if(expireTime < Date.now()){
      console.log("Logout!")
      setLoggedIn(false);
      window.location.href = "/login";
    }
  }

  useEffect(() => {
    updateExpireTime();
  

  window.addEventListener("click", updateExpireTime);
  window.addEventListener("keypress", updateExpireTime);
  window.addEventListener("scroll", updateExpireTime);
  window.addEventListener("mousemove", updateExpireTime);

  return () => {
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);
  }
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    checkForInactivity();
  }, 60000);

  return () => clearInterval(interval);

}, []);



  return (
    <div className="App">
      <Progress.Component />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/addTicket" element={<AddTicket />} />
          <Route path="/updateTicket/:id" element={<UpdateTicket />} />
          <Route path="/viewTicket/:id" element={<ViewTicket />} />
          <Route path="/issue-type" element={<IssueType />} />
          <Route path="/issue-type/create" element={<AddIssueType />} />
          <Route path="/user/add-user" element={<AddUser />} />
          <Route path="/user/user-role" element={<UserRole />} />
          <Route path="/user/add-user-role" element={<AddUserRole />} />
          <Route path="/user/function" element={<Function />} />
          <Route path="/user/add-function" element={<AddFunction />} />
          <Route path="/viewFunction/:id" element={<ViewFunction />} />
          <Route path="/updateFunction/:id" element={<UpdateFunction />} />
          <Route path="/user/assign-function" element={<AssignFunction />} />
          <Route path="/user" element={<User />} />
          <Route path="/viewUser/:id" element={<ViewUser />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          <Route path="/viewUserRole/:id" element={<ViewUserRole />} />
          <Route path="/updateUserRole/:id" element={<UpdateUserRole />} />
          <Route path="/issue-category" element={<IssueCategory />} />
          <Route path="/add-issue-category" element={<AddIssueCategory />} />
          <Route
            path="/viewIssueCategory/:id"
            element={<ViewIssueCategory />}
          />
          <Route
            path="/updateIssueCategory/:id"
            element={<UpdateIssueCategory />}
          />
          <Route
            path="/tickets/generate-reports"
            element={<GenerateReport />}
          />
          <Route path="/settings" element={<Settings />} />{" "}
        </Route>
        <Route path="*" element={<NotFount />} />
      </Routes>
    </div>
  );
}

export default App;
