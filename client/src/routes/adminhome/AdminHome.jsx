import React, { useContext, useEffect, useState } from "react";
import "../../AdminStyles.css";
import AddShipment from "../../component/addshipment/AddShipment";
import AllShipments from "../../component/allshipment/AllShipment";
import UpdateShipment from "../../component/updateshipment/UpdateShipment";
import { PackagePlus, Boxes, LogOut } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { replace, useNavigate } from "react-router-dom";

const AdminHome = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  console.log(currentUser);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all"); // 'add', 'all', 'update'
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Function to switch to update view
  const triggerUpdate = (shipment) => {
    setSelectedShipment(shipment);
    setActiveTab("update");
  };

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");

      updateUser(null);
      localStorage.removeItem("swiftuser");
      navigate("/admin/login", {replace : true});

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/admin/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-logo"></div>
        <nav className="nav-list">
          <div
            className={`nav-item ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            <Boxes size={20} />
            <span className="norm"> All Shipments</span>
            <span className="resp">All</span>
          </div>
          <div
            className={`nav-item ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            <PackagePlus size={20} /> <span className="norm">Add Shipment</span>{" "}
            <span className="resp">Add</span>
          </div>
        </nav>
        <div onClick={() => handleLogout()} className="nav-item logout">
          <LogOut size={20} /> <span className="norm">Logout</span>{" "}
          <span className="resp">Out</span>
        </div>
      </aside>

      <div className="content-section">
        {activeTab === "add" && (
          <AddShipment onsuccess={() => setActiveTab("all")} />
        )}
        {activeTab === "all" && <AllShipments onUpdate={triggerUpdate} />}
        {activeTab === "update" && (
          <UpdateShipment
            data={selectedShipment}
            onBack={() => setActiveTab("all")}
          />
        )}
      </div>
    </div>
  );
};

export default AdminHome;
