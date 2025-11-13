import "../css/App.css";
import "../css/Profile.css";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string;
};

const mockProfile: UserProfile = {
  firstName: "Maverick",
  lastName: "Student",
  email: "mstudent@unomaha.edu",
  phone: "(402) 555-0123",
  photoUrl: "data:image/jpeg;base64,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",
};

export function ProfilePage() {
  const user = mockProfile;

  return (
    <section className="profile">
      <header className="profile__header">
        <h1 className="profile__name">
          {user.firstName} {user.lastName}
        </h1>
        <p className="profile__subtitle">UNO Mav-Marketplace Profile</p>
      </header>

      <div className="profile__imageContainer">
        <img
          src={user.photoUrl}
          alt={`${user.firstName} ${user.lastName} profile`}
          className="profile__avatar"
        />
      </div>

      <div className="profile__card">
        <h2 className="profile__sectionTitle">Profile Details</h2>
        <dl className="profile__list">
          <div className="profile__row">
            <dt>First Name</dt>
            <dd>{user.firstName}</dd>
          </div>
          <div className="profile__row">
            <dt>Last Name</dt>
            <dd>{user.lastName}</dd>
          </div>
          <div className="profile__row">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${user.email}`} className="profile__link">
                {user.email}
              </a>
            </dd>
          </div>
          <div className="profile__row">
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${user.phone}`} className="profile__link">
                {user.phone}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
