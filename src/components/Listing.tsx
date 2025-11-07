import { FaMapLocationDot, FaDollarSign } from "react-icons/fa6";
import type { IListing } from "../types";
import "../css/Listing.css";
import "../css/App.css";

function Listing(listingProps: IListing) {
  const { id, imageUrl, name, description, location, paymentType } =
    listingProps;
  const miloBailLink = "https://shorturl.at/1tZbw";

  const handleClick = () => {
    console.log("UNO listing clicked!");
  };

  return (
    <div className="listing-box" onClick={handleClick} title={id}>
      <img src={imageUrl} className="listing-image" alt="Mav logo" />
      <div className="listing-info">
        <h1 className="item-name">{name}</h1>
        <p className="item-description">{description}</p>
        <a className="meeting-location" href={miloBailLink}>
          <FaMapLocationDot /> {location}
        </a>
        <a className="payment-type" href="">
          <FaDollarSign /> {paymentType}
        </a>
      </div>
    </div>
  );
}

export default Listing;
