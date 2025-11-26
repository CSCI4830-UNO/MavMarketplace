import { Link, Outlet, useLocation } from "react-router-dom";
import mavLogo from "../assets/mav-logo.png";
import { FaStore, FaList, FaMessage, FaCircleQuestion } from "react-icons/fa6";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import "../css/Dashboard.css";

type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  { label: "Browse Listings", href: "/listings", icon: <FaStore /> },
  { label: "Create", href: "/create", icon: <FaEdit /> },
  { label: "My Listings", href: "/me/listings", icon: <FaList /> },
  { label: "Message Center", href: "/messages", icon: <FaMessage /> },
  { label: "Help / Safety", href: "/help", icon: <FaCircleQuestion /> },
];

export default function Dashboard() {
  const location = useLocation();

  return (
    <div className="dash">
      <nav className="dash-navbar">
        <Link to="/">
          <img src={mavLogo} className="dash-logo" alt="Mav Marketplace logo" />
        </Link>

        <div className="dash-nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              className={`dash-nav-link ${
                location.pathname === l.href ? "dash-nav-active" : ""
              }`}
              to={l.href}
            >
              {l.icon}
              <span className="dash-nav-label">{l.label}</span>
            </Link>
          ))}
        </div>

        <Link to="/profile" className="profile-icon">
          <FaUserCircle />
        </Link>
      </nav>

      <main className="dash-main">
        <Outlet />
      </main>

      <footer className="dash-footer">
        <small>© {new Date().getFullYear()} Mav-Marketplace</small>
      </footer>
    </div>
  );
}
