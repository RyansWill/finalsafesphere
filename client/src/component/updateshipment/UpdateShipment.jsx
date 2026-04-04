import React, { useEffect, useState } from "react";
import "../../AdminStyles.css";
import { countries } from "../../lib/dummyData";
import apiRequest from "../../lib/apiRequest";

const UpdateShipment = ({ data, onBack }) => {
  const [formData, setFormData] = useState(data);
  const [publishError, setPublishError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Synchronize state if 'data' prop changes
  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setPublishError("");

    try {
      console.log(formData.id)

      const res = await apiRequest.put(`/track/update-Track`, formData);
      console.log(res.data.id);
      alert("Shipment Updated Successfully!");
      onBack(); // Returns to the "all" tab in AdminHome
    } catch (err) {
      console.error(err);
      setPublishError(
        err.response?.data?.message || "Failed to update shipment."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="admin-card">
      <h2>Update Shipment</h2>
      <form className="admin-form" onSubmit={handleUpdate}>
        <div className="trackinNo-section">
          <input
            value={formData.trackingNumber || ""}
            disabled
            type="text"
            className="track_input"
            name="trackingNumber"
          />
        </div>

        <div className="form-grid">
          {/* SHIPPER DETAILS */}
          <div className="shipper-section">
            <h4>SHIPPER DETAILS</h4>
            <div className="row">
              <span>Shipper Name</span>
              <input
                name="shipperName"
                type="text"
                value={formData.shipperName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Phone Number</span>
              <input
                name="shipperPhone"
                type="text"
                value={formData.shipperPhone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <span>Address</span>
              <input
                name="shipperAddress"
                type="text"
                value={formData.shipperAddress || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Email</span>
              <input
                name="shipperEmail"
                type="text"
                value={formData.shipperEmail || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* RECEIVER DETAILS */}
          <div className="receiver-section">
            <h4>RECEIVER DETAILS</h4>
            <div className="row">
              <span>Receiver Name</span>
              <input
                name="receiverName"
                type="text"
                value={formData.receiverName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Phone Number</span>
              <input
                name="receiverPhone"
                type="text"
                value={formData.receiverPhone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <span>Address</span>
              <input
                name="receiverAddress"
                type="text"
                value={formData.receiverAddress || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Email</span>
              <input
                name="receiverEmail"
                type="text"
                value={formData.receiverEmail || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* SHIPMENT DETAILS */}
          <div className="form-section">
            <h4>SHIPMENT DETAILS</h4>
            <div className="row">
              <span>Type of Shipment</span>
              <select
                name="typeofShipment"
                value={formData.typeofShipment || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="Same-Day Delivery">Same-Day Delivery</option>
                <option value="Priority Mail">Priority Mail</option>
                <option value="Standard/Ground Mail">
                  Standard/Ground Mail
                </option>
                <option value="Economy Mail">Economy Mail</option>
              </select>
            </div>
            <div className="row">
              <span>Packages</span>
              <input
                name="packages"
                type="text"
                value={formData.packages || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Product Name</span>
              <input
                name="productName"
                type="text"
                value={formData.productName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Payment Mode</span>
              <select
                name="paymentMode"
                value={formData.paymentMode || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Payment --</option>
                <option value="BANK TRANSFER">BANK TRANSFER</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="ZELLE">ZELLE</option>
                <option value="CASHAPP">CASHAPP</option>
                <option value="APPLE PAY">APPLE PAY</option>
                <option value="E-Transfer">E-Transfer</option>
                <option value="GOOGLE PAY">GOOGLE PAY</option>
                <option value="R.I.B">R.I.B</option>
                <option value="VISA">VISA / MASTERCARD</option>
              </select>
            </div>
            <div className="row">
              <span>Carrier</span>
              <select
                name="carrier"
                value={formData.carrier || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Carrier --</option>
                <option value="UPS">UPS</option>
                <option value="DHL">DHL</option>
                <option value="FEDEX">FEDEX</option>
                <option value="MAERSK">MAERSK</option>
                <option value="AMAZON LOGISTICS">AMAZON LOGISTICS</option>
                <option value="CANADA POST">CANADA POST</option>
              </select>
            </div>
            <div className="row">
              <span>Origin</span>
              <select
                name="origin"
                value={formData.origin || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Country --</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <span>Destination</span>
              <select
                name="destination"
                value={formData.destination || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Country --</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <span>Departure Date</span>
              <input
                name="departureDate"
                type="date"
                value={formData.departureDate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Departure Time</span>
              <input
                name="departureTime"
                type="time"
                value={formData.departureTime || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Arrival Date</span>
              <input
                name="arrivalDate"
                type="date"
                value={formData.arrivalDate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Arrival Time</span>
              <input
                name="arrivalTime"
                type="time"
                value={formData.arrivalTime || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Courier</span>
              <select
                name="courier"
                value={formData.courier || ""}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Courier --</option>
                <option value="SWIFTSPHERE TRANSIT">SWIFTSPHERE TRANSIT</option>
                <option value="USPS">USPS</option>
                <option value="DHL">DHL</option>
                <option value="COLISSIMO">COLISSIMO</option>
                <option value="POST NORD">POST NORD</option>
                <option value="UPS">UPS</option>
                <option value="CANADA POST">CANADA POST</option>
                <option value="PIRATE SHIP">PIRATE SHIP</option>
              </select>
            </div>
            <div className="row">
              <span>Mode of Transport</span>
              <select
                name="transportMode"
                value={formData.transportMode || ""}
                onChange={handleChange}
                required
              >
                <option value="Road Freight">Road Freight</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Ocean Freight">Ocean Freight</option>
                <option value="Multimodal Freight">Multimodal Freight</option>
              </select>
            </div>
            <div className="row">
              <span>Quantity</span>
              <input
                name="quatity"
                type="number"
                value={formData.quatity || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <span>Total Freight(currency)</span>
              <input
                name="totalFreight"
                type="text"
                value={formData.totalFreight || ""}
                onChange={handleChange}
                required
                placeholder="ex: 64.00$"
              />
            </div>
            <div className="row">
              <span>Carrier Reference No.</span>
              <input
                name="carrierReferenceNo"
                type="number"
                value={formData.carrierReferenceNo || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row dimensions">
              <div>
                <span>Length(cm)</span>
                <input
                  name="length"
                  type="number"
                  value={formData.length || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <span>Width(cm)</span>
                <input
                  name="width"
                  type="number"
                  value={formData.width || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <span>Height(cm)</span>
                <input
                  name="height"
                  type="number"
                  value={formData.height || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <span>Weight(kg/Ib)</span>
                <input
                  name="weight"
                  type="text"
                  value={formData.weight || ""}
                  onChange={handleChange}
                  required
                  placeholder="exp: 1kg/Ib"
                />
              </div>
            </div>
          </div>

          <div className="current-form-section">
            <h4>CURRENT STATUS</h4>
            <div className="newrow">
              <span>Date Modified</span>
              <input
                name="dateModified"
                type="date"
                value={formData.dateModified || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="newrow">
              <span>Time</span>
              <input
                name="time"
                type="time"
                value={formData.time || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="newrow">
              <span>Location</span>
              <input
                name="location"
                type="text"
                value={formData.location || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="newrow">
              <span>Status</span>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                required
              >
                <option value="In Transit">In Transit</option>
                <option value="Pending">Pending</option>
                <option value="Held at Customs">Held at Customs</option>
                <option value="Delivered">Delivered</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div className="newrow">
              <span>Remarks</span>
              <textarea
                rows={5}
                name="remarks"
                value={formData.remarks || ""}
                onChange={handleChange}
                placeholder="Add specific remarks of the packages here..."
                required
              />
            </div>
          </div>
        </div>
        <div className="validate_form">
          {publishError && <p style={{ color: "red" }}>{publishError}</p>}
          <button type="button" onClick={onBack} className="cancel-btn">
            <i class="fa fa-chevron-left" aria-hidden="true"></i> Go Back
          </button>
          <button type="submit" disabled={isPublishing} className="save-btn">
            {isPublishing ? `Updating...` : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateShipment;
