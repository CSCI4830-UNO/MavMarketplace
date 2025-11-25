import { useState, type FormEvent } from "react";
import "../css/CreatePage.css";     // <-- NEW CSS FILE
import "../css/App.css";

type NewListing = {
  id: string;
  name: string;
  price: number;
  location: string;
  paymentType: string;
  imageUrl: string;
};

export function CreatePage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImageUrl(url); // later replace with Firebase Storage URL
  };

  // Create listing
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !location || !paymentType || !imageUrl) {
      setError("Please fill out all fields.");
      return;
    }

    const newListing: NewListing = {
      id: crypto.randomUUID(),
      name,
      price: Number(price),
      location,
      paymentType,
      imageUrl,
    };

    console.log("NEW LISTING CREATED:", newListing);

    alert("Listing Created Successfully!");

    // Reset fields
    setName("");
    setPrice("");
    setLocation("");
    setPaymentType("");
    setImageUrl("");
    setImagePreview("");
  };

  return (
    <div className="create-container">
      <h1 className="create-title">Create New Listing</h1>

      {error && <p className="create-error">{error}</p>}

      <form className="create-form" onSubmit={handleSubmit}>
        {/* IMAGE UPLOAD */}
        <label>
          Item Image
          <input
            type="file"
            accept="image/*"
            className="create-file"
            onChange={handleImageUpload}
          />
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="create-image-preview"
          />
        )}

        {/* IMAGE URL (optional if uploading) */}
        <label>
          Image URL (optional if uploading)
          <input
            type="text"
            className="create-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        {/* ITEM NAME */}
        <label>
          Item Name
          <input
            type="text"
            className="create-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: UNO Hoodie"
          />
        </label>

        {/* PRICE */}
        <label>
          Price
          <input
            type="number"
            className="create-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: 25"
          />
        </label>

        {/* LOCATION */}
        <label>
          Location
          <select
            className="create-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select location</option>
            <option>Scott Village</option>
            <option>Criss Library</option>
            <option>Milo Bail Student Center</option>
          </select>
        </label>

        {/* PAYMENT TYPE */}
        <label>
          Payment Type
          <select
            className="create-select"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="">Select payment method</option>
            <option>Cash</option>
            <option>Venmo</option>
            <option>Cashapp</option>
          </select>
        </label>

        <button type="submit" className="create-button">
          Create Listing
        </button>
      </form>
    </div>
  );
}
