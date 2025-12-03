import { useState } from "react";
import { listingMocks } from "../mock-data/listing-mocks";
import Listing from "../components/Listing";
import SearchBar from "../components/SearchBar";
import "../css/ListingPage.css";

export function ListingPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const filteredListings = listingMocks.filter((listing) => {
    const matchesSearch =
      searchText.trim() === "" ||
      listing.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesPrice =
      selectedPriceRange.length === 0 ||
      (listing.price >= selectedPriceRange[0] &&
        listing.price <= selectedPriceRange[1]);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(listing.location);

    const matchesPayment =
      selectedPayments.length === 0 ||
      selectedPayments.includes(listing.paymentType);

    return matchesSearch && matchesPrice && matchesLocation && matchesPayment;
  });

  return (
    <div>
      <SearchBar
        onSearch={setSearchText}
        onFilterChange={(priceRange, locations, payments) => {
          setSelectedPriceRange(priceRange);
          setSelectedLocations(locations);
          setSelectedPayments(payments);
        }}
      />

      <div className="listing-grid">
        {filteredListings.map((item) => (
          <div key={item.id} className="listing-wrapper">
            <Listing {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
