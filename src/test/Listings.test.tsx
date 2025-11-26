import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Listing from '../components/Listing';
import '@testing-library/jest-dom';

const mockListing = {
  id: '123',
  name: 'Calculus Textbook',
  price: 50,
  imageUrl: 'https://placehold.co/100',
  location: 'PKI Building',
  paymentType: 'Venmo',
  canEdit: false,
};

describe('Listing Component', () => {
  
  it('renders the listing name correctly', () => {
    render(<Listing {...mockListing} />);
    const titleElement = screen.getByText('Calculus Textbook');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the price formatted with a dollar sign', () => {
    render(<Listing {...mockListing} />);
    const priceElement = screen.getByText('$50'); 
    expect(priceElement).toBeInTheDocument();
  });

  it('shows the correct location', () => {
    render(<Listing {...mockListing} />);
    const locationElement = screen.getByText('PKI Building');
    expect(locationElement).toBeInTheDocument();
  });

  it('shows the edit button only when canEdit is true', () => {
    const { unmount } = render(<Listing {...mockListing} canEdit={true} />);
    
    const editIcon = document.querySelector('.edit-icon');
    expect(editIcon).toBeInTheDocument();

    unmount();

    render(<Listing {...mockListing} canEdit={false} />);
    
    const missingIcon = document.querySelector('.edit-icon');
    expect(missingIcon).not.toBeInTheDocument();
  });
});