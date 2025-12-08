import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Listing from "../components/Listing";
import type { IListing } from "../types";
import "../css/ListingPage.css";

export function MyListingPage() {
  const [user] = useAuthState(auth);
  const [myListings, setMyListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;

      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, where("canEdit", "==", user.uid));

      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IListing[];

      setMyListings(items);
      setLoading(false);
    };

    fetchListings();
  }, [user]);

  return (
    <div>
      <h1>{user?.displayName || "User"}'s Listings</h1>
      <div className="listing-grid">
        {loading && <p>Loading...</p>}

        {!loading && myListings.length === 0 && (
          <p>You don't have any listings yet</p>
        )}

        {myListings.map((item) => (
          <div key={item.id} className="listing-wrapper">
            <Listing {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
