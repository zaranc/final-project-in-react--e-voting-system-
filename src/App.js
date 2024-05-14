import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./Admin/Pages/Dashboard";
import Party from "./Admin/Pages/Party";
import Election from "./Admin/Pages/Election";
import Connection from "./Admin/Pages/Connection";
import User from "./Admin/Pages/User";
import UserNav from "./User/Header/UserNav";
import Home from "./User/Pages/Home";
import LoginUser from "./components/LoginUser";


import { useDispatch } from "react-redux";
import {
  GET_ALL_CONNECTION_PENDING,
  GET_ALL_ELECTION_PENDING,
  GET_ALL_PARTY_PENDING,
  GET_ALL_USER_PENDING,
  GET_ALL_VOTE_PENDING,
} from "./redux-saga/admin/action/Action";
import { useEffect } from "react";
import { election_get_req, party_get_req, partylist_get_req, user_get_req, vote_get_req } from "./redux-saga/Constant";
import Sidebar from "./Admin/Header/Sidebar";

const getRole = () => {
  return localStorage.getItem("role");
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_ELECTION_PENDING, endpoint: election_get_req });
    dispatch({ type: GET_ALL_PARTY_PENDING, endpoint: party_get_req });
    dispatch({ type: GET_ALL_CONNECTION_PENDING, endpoint: partylist_get_req });
    dispatch({ type: GET_ALL_USER_PENDING, endpoint: user_get_req });
    dispatch({ type: GET_ALL_VOTE_PENDING, endpoint: vote_get_req });
  }, []);

  const role = getRole();
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  if (!role || role === "") {
    return (
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (role === "admin") {
    return (
      <>
        <Sidebar />
        <div
          className="container"
          style={{
            maxWidth: "1150px",
            padding: "30px 40px 40px",
            height: "100vh",
            marginLeft: "310px",
          }}
        >
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/party" element={<Party />} />
            <Route path="/election" element={<Election />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </>
    );
  }

  if (role === "user") {
    return (
      <>
        <UserNav />
        <div
          className="container"
          style={{
            maxWidth: "1150px",
            padding: "30px 40px 40px",
            height: "100vh",
            marginLeft: "310px",
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
