import { useState } from 'react';
import Listing from '../components/Listing';
import SearchBar from '../components/SearchBar';
import '../css/ListingPage.css';

interface IListing {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  location: string;
  paymentType: string;
  canEdit: boolean;
}

const initialListings: IListing[] = [
  {
    id: '1',
    name: 'Calculus Textbook',
    price: 45,
    imageUrl: 'https://placehold.co/300x200/png',
    location: 'UNO Library',
    paymentType: 'Cash',
    canEdit: true
  },
  {
    id: '2',
    name: 'Graphing Calculator',
    price: 80,
    imageUrl: 'https://placehold.co/300x200/png',
    location: 'PKI Building',
    paymentType: 'Venmo',
    canEdit: true
  }
];

export function ListingPage() {
  const [listings, setListings] = useState<IListing[]>(initialListings);

  const [searchText, setSearchText] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const filteredListings = listings.filter(listing => {
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

    return (
      matchesSearch &&
      matchesPrice &&
      matchesLocation &&
      matchesPayment
    );
  });

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(item => item.id !== id));
    }
  };

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
            <button 
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete Listing
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}