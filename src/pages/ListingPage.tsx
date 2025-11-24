import { useState } from "react";
import { listingMocks } from "../mock-data/listing-mocks";
import Listing from "../components/Listing";
import SearchBar from "../components/SearchBar/SearchBar";

import "../css/ListingPage.css";
import "../css/App.css";

export function ListingPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const filteredListings = listingMocks.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(searchText);

    const matchesPriceRange =
      selectedPriceRange.length === 0 ||
      (listing.price >= selectedPriceRange[0] &&
        listing.price <= selectedPriceRange[1]);
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(listing.location);
    const matchesPayment =
      selectedPayments.length === 0 ||
      selectedPayments.includes(listing.paymentType);

    return (
      matchesSearch && matchesPriceRange && matchesLocation && matchesPayment
    );
  });

  return (
    <div>
      <h1>Listing Page</h1>

      <SearchBar
        onSearch={setSearchText}
        onFilterChange={(priceRange, locations, payments) => {
          setSelectedPriceRange(priceRange);
          setSelectedLocations(locations);
          setSelectedPayments(payments);
        }}
      />

      <div className="listing-grid">
        {filteredListings.map((listing) => (
          <Listing key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  );
}
