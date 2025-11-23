import type { IListing } from "../types";
import unoImage from "../assets/uno-image.jpg";

const randomPrice = () =>
  Number((Math.random() * 999 + 1).toFixed(2));

const locations = [
  "Scott Village",
  "Criss Library",
  "Milo Bail Student Center",
];

const payments = ["Venmo", "Cashapp", "Cash"];

export const listingMocks: IListing[] = [
  {
    id: "1",
    imageUrl: unoImage,
    name: "Mavs Pennant",
    price: randomPrice(),
    location: locations[0],
    paymentType: payments[0],
    canEdit: false,
  },
  {
    id: "2",
    imageUrl: unoImage,
    name: "Maverick Hoodie",
    price: randomPrice(),
    location: locations[1],
    paymentType: payments[1],
    canEdit: true,
  },
  {
    id: "3",
    imageUrl: unoImage,
    name: "UNO Water Bottle",
    price: randomPrice(),
    location: locations[2],
    paymentType: payments[0],
    canEdit: true,
  },
  {
    id: "4",
    imageUrl: unoImage,
    name: "Mavs Beanie",
    price: randomPrice(),
    location: locations[0],
    paymentType: payments[2],
  },
  {
    id: "5",
    imageUrl: unoImage,
    name: "UNO Lanyard",
    price: randomPrice(),
    location: locations[1],
    paymentType: payments[1],
  },
  {
    id: "6",
    imageUrl: unoImage,
    name: "Maverick Flag",
    price: randomPrice(),
    location: locations[2],
    paymentType: payments[0],
  },
  {
    id: "7",
    imageUrl: unoImage,
    name: "UNO T-Shirt",
    price: randomPrice(),
    location: locations[0],
    paymentType: payments[2],
  },
  {
    id: "8",
    imageUrl: unoImage,
    name: "Maverick Mug",
    price: randomPrice(),
    location: locations[1],
    paymentType: payments[1],
  },
  {
    id: "9",
    imageUrl: unoImage,
    name: "UNO Winter Hat",
    price: randomPrice(),
    location: locations[2],
    paymentType: payments[0],
  },
  {
    id: "10",
    imageUrl: unoImage,
    name: "Mavs Pennant (Red)",
    price: randomPrice(),
    location: locations[0],
    paymentType: payments[0],
  },
  {
    id: "11",
    imageUrl: unoImage,
    name: "UNO Bracelet",
    price: randomPrice(),
    location: locations[1],
    paymentType: payments[1],
  },
  {
    id: "12",
    imageUrl: unoImage,
    name: "Maverick Scarf",
    price: randomPrice(),
    location: locations[2],
    paymentType: payments[2],
  },
];
