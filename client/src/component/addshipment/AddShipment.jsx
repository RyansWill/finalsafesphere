import "../../AdminStyles.css";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { countries } from "../../lib/dummyData";

const AddShipment = ({ onsuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState(false);
  const [error, setError] = useState("");
  const [generateCode, setGenerateCode] = useState("");

  const handleGeneratecode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let isUnique = false;
    let newGeneratedCode = "";

    try {
      do {
        const randomDigits = Math.floor(Math.random() * 1e15)
          .toString()
          .padStart(15, "0");
        newGeneratedCode = `CG-${randomDigits}-CRGO`;

        try {
          const res = await apiRequest.post("/track/get-Track", {
            trackingNumber: newGeneratedCode,
          });

          setError("Tracking Number Exist Already, regenerating...");
        } catch (err) {
          if (err.response?.status === 404) {
            isUnique = true;
            setGenerateCode(newGeneratedCode);
            console.log("unique Tracking Number Created:", newGeneratedCode);
          } else {
            const errorMsg =
              err.response?.data?.message || "Server Connection Error";
            console.log("Error:", errorMsg);
            setError(errorMsg);
            break;
          }
        }
      } while (!isUnique);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsPublishing(true);
    setPublishError("");

    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData);

    if (!inputs.trackingNumber) {
      setPublishError("Please generate a tracking  number first!");
      setIsPublishing(false);
      return;
    }

    try {
      const res = await apiRequest.post("/track/create-Track",  inputs);

      console.log("Shipment Created Successfully:", res.data);

      onsuccess();
    } catch (err) {
      console.log(err);
      setPublishError(
        err.response?.data?.message || "Failed to create shipment. Try again."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="admin-card">
      <h2>Add New Shipment</h2>
      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >
        <div className="trackinNo-section">
          <input
            value={generateCode}
            onChange={(e) => setGenerateCode(e.target.value)}
            type="text"
            placeholder="CG-xxxxxxxxxxxxxxx-CARGO"
            className="track_input"
            name="trackingNumber"
          />
          <button
            disabled={isLoading}
            type="button"
            onClick={handleGeneratecode}
          >
            {isLoading ? `Generating...` : "Generate"}
          </button>
        </div>
        {error && <span>{error}</span>}
        <div className="form-grid">
          <div className="shipper-section">
            <h4>
              <span className="step-num"></span> SHIPPER DETAILS
            </h4>
            <div className="row">
              <span>Shipper Name</span>
              <input name="shipperName" type="text" required/>
            </div>
            <div className="row">
              <span>Phone Number</span>
              <input name="shipperPhone" type="text" />
            </div>
            <div className="row">
              <span>Address</span>
              <input name="shipperAddress" type="text" required/>
            </div>
            <div className="row">
              <span>Email</span>
              <input name="shipperEmail" type="text" required/>
            </div>
          </div>
          <div className="receiver-section">
            <h4>
              <span className="step-num"></span> RECEIVER DETAILS
            </h4>
            <div className="row">
              <span>Receiver Name</span>
              <input name="receiverName" type="text" required/>
            </div>
            <div className="row">
              <span>Phone Number</span>
              <input name="receiverPhone" type="text" />
            </div>
            <div className="row">
              <span>Address</span>
              <input name="receiverAddress" type="text" required/>
            </div>
            <div className="row">
              <span>Email</span>
              <input  name="receiverEmail" type="text" required/>
            </div>
          </div>
          <div className="form-section">
            <h4>
              <span className="step-num"></span> SHIPMENT DETAILS
            </h4>
            <div className="row">
              <span>Type of Shipment</span>
              <select name="typeofShipment" required>
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
              <input name="packages" type="text" placeholder="e.g. 2 Boxes" required/>
            </div>
            <div className="row">
              <span>Product Name</span>
              <input name="productName" type="text" required/>
            </div>
            <div className="row">
              <span>Payment Mode</span>
              <select name="paymentMode" required>
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
              <select name="carrier" id="carrier" required>
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
              <select name="origin" id="origin" required>
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
              <select name="destination" id="destination" required>
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
              <input name="departureDate" type="date" required/>
            </div>
            <div className="row">
              <span>Departure Time</span>
              <input name="departureTime" type="time" required/>
            </div>
            <div className="row">
              <span>Arrival Date</span>
              <input name="arrivalDate" type="date" required/>
            </div>
            <div className="row">
              <span>Arrival Time</span>
              <input name="arrivalTime" type="time" required/>
            </div>
            <div className="row">
              <span>Courier</span>
              <select name="courier" id="courier" required>
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
              <select name="mode" required>
                <option value="Road Freight">Road Freight</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Ocean Freight">Ocean Freight</option>
                <option value="Multimodal Freight">Multimodal Freight</option>
              </select>
            </div>
            <div className="row">
              <span>Quantity</span>
              <input name="quatity" type="number" required/>
            </div>
            <div className="row">
              <span>Total Freight(currency)</span>
              <input name="totalFreight" type="text" required placeholder="ex: $64.00"/>
            </div>
            <div className="row">
              <span>Carrier Reference No.</span>
              <input name="carrierReferenceNo" type="number" required/>
            </div>
            <div className="row dimensions">
              <div>
                <span>Length(cm)</span>
                <input name="length" type="number" required/>
              </div>
              <div>
                <span>Width(cm)</span>
                <input name="width" type="number" required/>
              </div>
              <div>
                <span>Height(cm)</span>
                <input name="height" type="number" required/>
              </div>
              <div>
                <span>Weight(kg/Ib)</span>
                <input name="weight" type="text" required placeholder="exp: 1kg/Ib"/>
              </div>
            </div>
          </div>

          <div className="current-form-section">
            <h4>
              <span className="step-num"></span> CURRENT STATUS
            </h4>
            <div className="newrow">
              <span>Date Modified</span>
              <input name="dateModified" type="date" required/>
            </div>
            <div className="newrow">
              <span>Time</span>
              <input name="time" type="time" required/>
            </div>
            <div className="newrow">
              <span>Location</span>
              <input name="location" type="text" required/>
            </div>
            <div className="newrow">
              <span>Status</span>
              <select name="status" id="status" required>
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
                placeholder="Add specific remarks of the packages here..."
                required
              />
            </div>
          </div>
        </div>
        <div className="validate_form">
          {publishError && <p style={{ color: "red" }}>{publishError}</p>}
          <a href="/admin/home">Move to trash</a>
          <button
          type="submit"
            disabled={isPublishing}
            className="save-btn"
          >
            {isPublishing ? `Publishing...` : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShipment;
