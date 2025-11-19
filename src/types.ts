export interface IListing {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    location: string;
    paymentType: string;

    canEdit?: boolean; //Checks if the user can edit the listing or not(is there listing or not)
}
