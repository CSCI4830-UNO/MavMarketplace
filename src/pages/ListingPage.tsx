import { useState } from 'react';
import Listing from '../components/Listing';
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

export function MyListingPage() {
  const [listings, setListings] = useState<IListing[]>(initialListings);

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(item => item.id !== id));
    }
  };

  return (
    <div className="my-listings-page">
      <div className="page-header">
        <h1>My Listings</h1>
        <button className="add-btn">
          + Create New
        </button>
      </div>

    
      <div className="listing-grid">
        {listings.map((item) => (
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