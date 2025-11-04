import { FaMapLocationDot, FaDollarSign } from "react-icons/fa6";
import unoImage from "../assets/uno-image.jpg";
import "../css/Listing.css";
import "../css/App.css";

function Listing() {
  const miloBailLink = "https://shorturl.at/1tZbw";

  const handleClick = () => {
    console.log("UNO listing clicked!");
  };

  return (
    <div className="listing-box" onClick={handleClick}>
      <img src={unoImage} className="listing-image" alt="Mav logo" />
      <div className="listing-info">
        <h1 className="item-name">Item Name</h1>
        <p className="item-description">
          This is a sample listing component for the Mav-Marketplace
          application.
        </p>
        <a className="meeting-location" href={miloBailLink}>
          <FaMapLocationDot /> Milo Bail Student Center
        </a>
        <a className="payment-type" href="">
          <FaDollarSign /> Venmo
        </a>
      </div>
    </div>
  );
}

export default Listing;
