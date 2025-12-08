export interface IListing {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    location: string;
    paymentType: string;
    canEdit?: string;
}
