import type { FC } from "react";
import { FaMapLocationDot, FaDollarSign } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import type { IListing } from "../types";
import "../css/Listing.css";
import "../css/App.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Listing: FC<IListing> = (listingProps: IListing) => {
  const { id, imageUrl, name, price, location, paymentType, canEdit } =
    listingProps;
  
  const locationLinks: Record<string, string> = {
    "Milo Bail Student Center": "https://maps.app.goo.gl/LheoriHSPCskG7hV7",
    "Criss Library": "https://maps.app.goo.gl/QGNq4x4n8Gt11LnC7",
    "Scott Village Clubhouse": "https://maps.app.goo.gl/fDCYKE3Gf2xbMavC6",
  }

  const locationUrl = locationLinks[location] || "https://maps.google.com";

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${listingProps.id}`);
  };

  return (
    <div className="listing-box" title={id}>
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

          {user && canEdit === user.uid && (
            <a className="icon edit-icon">
              <FaEdit onClick={handleEdit} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
