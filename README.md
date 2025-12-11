# MavMarketplace

A secure, exclusive marketplace for UNO students to buy and sell items within the campus community.

## Overview

MavMarketplace is a React-based web application that provides University of Nebraska Omaha (UNO) students with a safe platform to conduct transactions. By restricting access to UNO email domains, the platform creates a trusted environment for campus commerce.

## Features

- **Secure Authentication**: Email/password authentication restricted to @unomaha.edu email addresses
- **Create Listings**: Post items for sale with images, pricing, and location details
- **Browse Marketplace**: View all available listings with search and filter capabilities
- **Price Filtering**: Filter listings by price range using an interactive slider
- **Payment Options**: Specify accepted payment methods (Cash, Venmo, PayPal, etc.)
- **My Listings**: Manage your posted items in one place
- **Image Upload**: Upload product images stored securely in Firebase Storage
- **Protected Routes**: Authentication-required pages for creating listings and viewing profiles
- **Responsive Design**: Mobile-friendly interface using Material-UI components

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router v7
- **Backend/Database**: Firebase
  - Authentication (Email/Password)
  - Firestore (NoSQL database)
  - Storage (Image hosting)
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS 
- **Icons**: React Icons


## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm 
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CSCI4830-UNO/MavMarketplace.git
cd MavMarketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Update [src/config/firebase.ts](src/config/firebase.ts) with your Firebase configuration

4. Start the development server:
```bash
npm run dev
```

5. Open localhost in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests




## Security Features

- UNO email domain restriction (@unomaha.edu)
- Phone number validation with auto-formatting during signup
- Protected routes requiring authentication
- Firebase Security Rules for database access control
- Input validation on forms

