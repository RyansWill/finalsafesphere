import React, { useEffect, useState } from "react";
import { Search, Edit3, Trash2 } from "lucide-react";
import "../../AdminStyles.css";
import apiRequest from "../../lib/apiRequest";

const AllShipments = ({ onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [trackingInfo, setTrackingInfo] = useState([]);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError("");

      try {
        const res = await apiRequest.get("/track/get-Tracks");
        setTrackingInfo(res.data);

        const result = res.data;
        console.log("Fetched Data:", result);
      } catch (err) {
        const errorMsg = err.response?.data?.message;
        console.log(errorMsg);
        setError(errorMsg);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await apiRequest.delete(`/track/delete-Track/${id}`);
      
      setTrackingInfo((prev) => prev.filter((item) => item.id !== id));

      alert("Deleted Successfully");
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = trackingInfo.filter(
    (s) =>
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.receiverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-card">
      <div className="table-header">
        <h2>All Shipments</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by tracking or name..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="all-shipment-container">
        <h4>Tracking Info</h4>
        <div className="all-shipment-table">
          {filtered.map((item) => (
            <div key={item.id} className="shipment">
              <span className="trackNo">{item.trackingNumber}</span>
              <span className="receiver-name">To: {item.receiverName}</span>
              <span className="shipstatus">{item.status}</span>
              <span className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => onUpdate(item)}
                >
                  Edit <Edit3 size={16} />
                </button>
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className="delete-button"
                >
                  {isDeleting ? `Deleting...` : "Delete"} <Trash2 size={16} />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllShipments;
