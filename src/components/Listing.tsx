import mavHoodie from "../assets/uno-hoodie.jpeg";
import "../css/Listing.css";
import "../css/App.css";

function Listing() {
  const miloBailLink = "https://shorturl.at/1tZbw";

  return (
    <div className="listing-box">
      <img src={mavHoodie} className="listing-image" alt="Mav logo" />
      <div className="listing-info">
        <h1 className="item-name">Item Name</h1>
        <p className="item-description">
          This is a sample listing component for the Mav-Marketplace
          application.
        </p>
        <a className="meeting-location" href={miloBailLink}>
          Milo Bail Student Center
        </a>
        <a className="payment-type" href="">
          Venmo
        </a>
      </div>
    </div>
  );
}

export default Listing;
