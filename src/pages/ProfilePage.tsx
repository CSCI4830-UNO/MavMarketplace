import { useEffect, useState, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../config/firebase";
import "../css/App.css";
import "../css/Profile.css";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
};

export function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) {
        setError("No user logged in");
        setLoading(false);
        return;
      }

      try {
        // Fetch user data from Firestore using the user's UID
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || currentUser.email || "",
            phone: userData.phone || undefined,
            photoUrl: userData.photoUrl || undefined,
          });
        } else {
          setError("User profile not found");
        }
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [currentUser]);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Create a reference to the file in Firebase Storage
      // Store in: profile-pictures/{userId}/{timestamp}-{filename}
      const timestamp = Date.now();
      const storageRef = ref(
        storage,
        `profile-pictures/${currentUser.uid}/${timestamp}-${file.name}`
      );

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const photoUrl = await getDownloadURL(storageRef);

      // Update Firestore with the new photo URL
      await updateDoc(doc(db, "users", currentUser.uid), {
        photoUrl: photoUrl,
      });

      // Update local state to show the new photo immediately
      setUserProfile((prev) => (prev ? { ...prev, photoUrl } : null));
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      // The auth state listener will automatically redirect to login page
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to log out. Please try again.");
    }
  }

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data available</div>;
  }

  return (
    <section className="profile">
      <header className="profile__header">
        <h1 className="profile__name">
          {userProfile.firstName} {userProfile.lastName}
        </h1>
        <p className="profile__subtitle">UNO Mav-Marketplace Profile</p>
        <button onClick={handleLogout} className="profile__logoutButton">
          Log Out
        </button>
      </header>

      <div className="profile__imageContainer">
        {userProfile.photoUrl ? (
          <img
            src={userProfile.photoUrl}
            alt={`${userProfile.firstName} ${userProfile.lastName} profile`}
            className="profile__avatar"
          />
        ) : (
          <div className="profile__avatar profile__avatar--placeholder">
            {userProfile.firstName[0]}
            {userProfile.lastName[0]}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="profile__uploadButton"
        >
          {uploading ? "Uploading..." : "Change Photo"}
        </button>
      </div>

      <div className="profile__card">
        <h2 className="profile__sectionTitle">Profile Details</h2>
        <dl className="profile__list">
          <div className="profile__row">
            <dt>First Name</dt>
            <dd>{userProfile.firstName}</dd>
          </div>
          <div className="profile__row">
            <dt>Last Name</dt>
            <dd>{userProfile.lastName}</dd>
          </div>
          <div className="profile__row">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${userProfile.email}`} className="profile__link">
                {userProfile.email}
              </a>
            </dd>
          </div>
          <div className="profile__row">
            <dt>Phone</dt>
            <dd>
              {userProfile.phone && (
                <a href={`tel:${userProfile.phone}`} className="profile__link">
                  {userProfile.phone}
                </a>
              )}
              {!userProfile.phone && "Not provided"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
