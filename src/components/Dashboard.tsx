import { FaStore, FaCircle, FaList, FaMessage, FaUser, FaCircleQuestion } from "react-icons/fa6";
import mavLogo from "../assets/mav-logo.png";
import "../css/Dashboard.css";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
};

const links: NavLink[] = [
  { label: "Browse Listings", href: "/listings", icon: <FaStore />, description: "See what’s for sale right now" },
  { label: "Post an Item", href: "/post", icon: <FaCircle />, description: "Create a new listing in minutes" },
  { label: "My Listings", href: "/me/listings", icon: <FaList />, description: "Manage and edit your items" },
  { label: "Messages", href: "/messages", icon: <FaMessage />, description: "Chat with buyers and sellers" },
  { label: "Profile", href: "/profile", icon: <FaUser />, description: "Update your contact and payment" },
  { label: "Help / Safety", href: "/help", icon: <FaCircleQuestion />, description: "Guidelines, tips, and support" },
];

export default function Dashboard() {
  return (
    <div className="dash">
      <header className="dash__header dash__header--centered">
        <img src={mavLogo} className="dash__logo" alt="Mav Marketplace logo" />
        <div className="dash__titles dash__titles--centered">
          <h1 className="dash__title">Mav-Marketplace</h1>
          <p className="dash__subtitle">Buy & sell with UNO students — simple, safe, and local.</p>
        </div>
      </header>

      {/* Navigation Grid */}
      <section className="dash__grid">
        {links.map((l) => (
          <a key={l.href} className="dash__card" href={l.href}>
            <div className="dash__cardIcon">{l.icon}</div>
            <div className="dash__cardText">
              <h3 className="dash__cardTitle">{l.label}</h3>
              <p className="dash__cardDesc">{l.description}</p>
            </div>
          </a>
        ))}
      </section>

      {/* Announcements */}
      <section className="dash__announcements">
        <h2>Announcements</h2>
        <ul>
          <li>🎯 Meet in public spaces like <a href="https://shorturl.at/1tZbw" target="_blank" rel="noreferrer">Milo Bail Student Center</a>.</li>
          <li>🔐 Never share passwords or sensitive info in messages.</li>
          <li>💵 Prefer cashless options and confirm payment before handing over items.</li>
        </ul>
      </section>

      <footer className="dash__footer">
        <small>© {new Date().getFullYear()} Mav-Marketplace • For UNO students</small>
      </footer>
    </div>
  );
}
