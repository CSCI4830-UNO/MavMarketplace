import { FaMapLocationDot, FaDollarSign } from "react-icons/fa6";
import type { FC } from "react";
import type { IListing } from "../types";
import "../css/Listing.css";
import "../css/App.css";
import { FaEdit } from "react-icons/fa";

const Listing: FC<IListing> = (listingProps: IListing) => {
  const { id, imageUrl, name, price, location, paymentType, canEdit } =
    listingProps;
  // Old hardcoded link
  // const miloBailLink = "https://shorturl.at/1tZbw";

  // Mapping of location names to URLs (actually leads to individual locations on maps)
  const locationLinks: Record<string, string> = {
    "Milo Bail Student Center": "https://maps.app.goo.gl/LheoriHSPCskG7hV7",
    "Criss Library": "https://maps.app.goo.gl/QGNq4x4n8Gt11LnC7",
    "Scott Village Clubhouse": "https://maps.app.goo.gl/fDCYKE3Gf2xbMavC6",
  }

  // Allows access to mapping above, defaults to Google Maps homepage if location not found
  const locationUrl = locationLinks[location] || "https://maps.google.com";

  const handleClick = () => {
    console.log("UNO listing clicked!");
  };

  return (
    <div className="listing-box" onClick={handleClick} title={id}>
      <img
        src={imageUrl || "../assets/uno-image.jpg"}
        className="listing-image"
        alt="Mav logo"
      />
      <div className="listing-info">
        <h1 className="item-name">{name}</h1>
        <p className="item-description">${price}</p>

        <div className="listing-bottom-row">
          <div className="left-meta">
            <a className="icon" href={locationUrl} target="_blank">
              <FaMapLocationDot /> {location}
            </a>
            <a className="icon">
              <FaDollarSign /> {paymentType}
            </a>
          </div>

          {canEdit && (
            <a className="icon edit-icon">
              <FaEdit />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
