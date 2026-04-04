import "./layout.css";
import Navbar from "../../component/navbar/navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? (
    <Navigate to="admin/login"/>
  ) : (
    <div className="layout">
      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequireAuth };
