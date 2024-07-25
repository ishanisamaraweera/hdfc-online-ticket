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
import GemstoneCertifications from "./components/Categories/GemstoneCertifications/GemstoneCertifications";
import DeleteIssueCategory from "./components/Categories/DeleteIssueCategory/DeleteIssueCategory";
import RingMetals from "./components/Categories/RingMetals/RingMetals";
import RingSize from "./components/Categories/RingSize/RingSize";
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
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import AddIssueType from "./components/IssueType/AddIssueType";


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
          <Route path="/user/add-new" element={<AddUser />} />
          <Route
            path="/issue-category"
            element={<IssueCategory />}
          />
          <Route
            path="/delete-issue-category"
            element={<DeleteIssueCategory />}
          />
          <Route
            path="/categories/gemstone-certifications"
            element={<GemstoneCertifications />}
          />
          <Route path="/categories/ring-sizes" element={<RingSize />} />
          <Route path="/categories/ring-metals" element={<RingMetals />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFount />} />
      </Routes>
    </div>
  );
}

export default App;
