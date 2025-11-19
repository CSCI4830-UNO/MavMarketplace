import { useState } from "react";
import { listingMocks } from "../mock-data/listing-mocks";
import Listing from "../components/Listing";
import SearchBar from "../components/SearchBar";

import "../css/ListingPage.css";
import "../css/App.css";

export function ListingPage() {
  const [searchText, setSearchText] = useState("");

  const filteredListings = listingMocks.filter((listing) =>
    listing.name.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <h1>Listing Page</h1>
      <SearchBar onSearch={setSearchText} />
      <div className="listing-grid">
        {filteredListings.map((listing) => (
          <Listing
            key={listing.id}
            id={listing.id}
            imageUrl={listing.imageUrl}
            name={listing.name}
            description={listing.description}
            location={listing.location}
            paymentType={listing.paymentType}
            canEdit={listing.canEdit}
          />
        ))}
      </div>
    </div>
  );
}
