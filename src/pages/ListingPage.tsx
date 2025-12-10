import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Listing from "../components/Listing";
import SearchBar from "../components/SearchBar";
import type { IListing } from "../types";
import "../css/ListingPage.css";

export function ListingPage() {
  const [user] = useAuthState(auth);
  const [myListings, setMyListings] = useState<IListing[]>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");

      const querySnapshot = await getDocs(listingsRef);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IListing[];

      setMyListings(items);
    };

    fetchListings();
  }, []);

  const filteredListings = myListings.filter((listing) => {
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
