import type { IListing } from "../types";
import unoImage from "../assets/uno-image.jpg";

export const listingMocks: IListing[] = [
    {
        id: "1",
        imageUrl: unoImage,
        name: "Mavs Pennant",
        description: "UNO Mavericks Pennant",
        location: "Scott's Village",
        paymentType: "Venmo",
    },
    {
        id: "2",
        imageUrl: unoImage,
        name: "Mavs Lanyard",
        description: "UNO Maverick Lanyard",
        location: "Criss Library",
        paymentType: "Cashapp",
    },
    {
        id: "3",
        imageUrl: unoImage,
        name: "Mavs Hat",
        description: "UNO maverick Hockey Hat",
        location: "Milo Bail Student Center",
        paymentType: "Venmo",
    },
];