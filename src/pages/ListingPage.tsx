import { listingMocks } from "../mock-data/listing-mocks";
import Listing from "../components/Listing";

import "../css/App.css";

export function ListingPage() {
  return (
    <div>
      <h1>Listing Page</h1>
      {listingMocks.map((listing) => (
        <Listing
          key={listing.id}
          id={listing.id}
          imageUrl={listing.imageUrl}
          name={listing.name}
          description={listing.description}
          location={listing.location}
          paymentType={listing.paymentType}
        />
      ))}
    </div>
  );
}
