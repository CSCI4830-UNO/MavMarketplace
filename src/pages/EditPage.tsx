import { useState, useEffect, useRef, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage, auth } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import type { IListing } from "../types";
import "../css/CreatePage.css";

export function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadListing = async () => {
      if (!id) {
        setError("Invalid listing ID.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "listings", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          console.error("Listing not found in Firestore. ID:", id);
          setError("Listing not found.");
          setLoading(false);
          return;
        }

        const data = snap.data() as IListing;

        setName(data.name);
        setPrice(String(data.price));
        setLocation(data.location);
        setPaymentType(data.paymentType);
        setImageUrl(data.imageUrl);
        setImagePreview(data.imageUrl);
      } catch (err) {
        console.error("Failed to load listing:", err);
        setError("Failed to load listing.");
      }

      setLoading(false);
    };

    loadListing();
  }, [id]);

  if (loading) return <h1>Loading listing...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) return;

    let updatedImageUrl = imageUrl;

    if (imageFile) {
      const filePath = `listings/${user.uid}/${Date.now()}_${imageFile.name}`;
      const fileRef = ref(storage, filePath);

      await uploadBytes(fileRef, imageFile);
      updatedImageUrl = await getDownloadURL(fileRef);
    }

    await updateDoc(doc(db, "listings", id!), {
      name,
      price: Number(price),
      location,
      paymentType,
      imageUrl: updatedImageUrl,
    });

    alert("Listing updated successfully!");
    navigate("/me/listings");
  };

  return (
    <div className="create-container">
      <h1 className="create-title">Edit Listing</h1>

      <form className="create-form" onSubmit={handleSubmit}>
        <label>
          Item Image
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </label>

        {imagePreview && (
          <img src={imagePreview} className="create-image-preview" />
        )}

        <label>
          Item Name
          <input
            className="create-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Price
          <input
            type="number"
            className="create-input"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Location
          <select
            className="create-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Scott Village Clubhouse</option>
            <option>Criss Library</option>
            <option>Milo Bail Student Center</option>
          </select>
        </label>

        <label>
          Payment Type
          <select
            className="create-select"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option>Cash</option>
            <option>Venmo</option>
            <option>Cashapp</option>
          </select>
        </label>

        <button className="create-button" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}
