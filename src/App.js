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
import DeleteIssueCategory from "./components/Categories/DeleteIssueCategory/DeleteIssueCategory";
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
import AddUserRole from "./components/User/AddUserRole";
import AddFunction from "./components/User/AddFunction";


function App() {
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
          <Route path="/user/add-user-role" element={<AddUserRole />} />
          <Route path="/user/add-function" element={<AddFunction />} />
          <Route
            path="/issue-category"
            element={<IssueCategory />}
          />
          <Route
            path="/delete-issue-category"
            element={<DeleteIssueCategory />}
          />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFount />} />
      </Routes>
    </div>
  );
}

export default App;
