import { useState, type FormEvent, useRef } from "react";
import type { IListing } from "../types";
import "../css/CreatePage.css";
import "../css/App.css";

import { db, auth } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaDollarSign } from "react-icons/fa6";

export function CreatePage() {
  const [user] = useAuthState(auth);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImageUrl(url);
  };

  // Create listing
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to create a listing.");
      return;
    }

    if (Number(price) <= 0) {
      setError("Your price must be greater than $0");
      return;
    }

    if (!name || !price || !location || !paymentType || !imageUrl) {
      setError("Please fill out all fields");
      return;
    }

    const newListing: IListing = {
      id: crypto.randomUUID(),
      imageUrl,
      name,
      price: Number(price),
      location,
      paymentType,
      canEdit: user.uid,
    };

    try {
      await addDoc(collection(db, "listings"), newListing);

      alert("Listing Created Successfully!");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Reset fields
      setName("");
      setPrice("");
      setLocation("");
      setPaymentType("");
      setImageUrl("");
      setImagePreview("");
    } catch (err) {
      console.error(err);
      setError("Failed to create listing. Please try again.");
    }
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
            ref={fileInputRef}
          />
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="create-image-preview"
          />
        )}

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
          <div className="price-input-wrapper">
            <FaDollarSign className="price-icon" />
            <input
              type="number"
              className="create-input price-input"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 25"
            />
          </div>
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
