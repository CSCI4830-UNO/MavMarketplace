import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Listing from "../components/Listing";
import SearchBar from "../components/SearchBar";
import type { IListing } from "../types";
import "../css/ListingPage.css";
import PopupCard from "../components/PopupCard";

export function ListingPage() {
  const [user] = useAuthState(auth);
  const [listings, setListings] = useState<IListing[]>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedListing, setSelectedListing] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;

      const listingsRef = collection(db, "listings");
      const dbListings = await getDocs(listingsRef);

      const items = dbListings.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IListing[];

      setListings(items);
    };

    fetchListings();
  }, []);

  const handleListingClick = async (listingId: string) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const ownerId = listing.canEdit;
    if (!ownerId) return;

    const userRef = doc(db, "users", ownerId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      setSelectedListing({
        name: data.firstName ?? "Seller",
        email: data.email ?? "No email provided",
        phone: data.phone ?? "No phone provided",
      });
    } else {
      setSelectedListing({
        name: "Unknown Seller",
        email: "...",
        phone: "...",
      });
    }

    setShowPopup(true);
  };

  const filteredListings = listings.filter((listing) => {
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
          <div
            key={item.id}
            className="listing-wrapper"
            onClick={() => handleListingClick(item.id)}
          >
            <Listing {...item} />
          </div>
        ))}
      </div>
      <PopupCard open={showPopup} onClose={() => setShowPopup(false)}>
        {selectedListing ? (
          <>
            <h2 className="popup-listing-message">
              Contact {selectedListing.name}
            </h2>
            <p>
              <strong>Email:</strong> {selectedListing.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedListing.phone}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </PopupCard>
    </div>
  );
}
