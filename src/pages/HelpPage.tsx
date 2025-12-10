import "../css/HelpPage.css";
import { FaShieldAlt, FaMoneyCheckAlt, FaUserShield } from "react-icons/fa";

export function HelpPage() {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Safety</h1>

      {/* Safe Exchange Tips */}
      <div className="help-card safe">
        <h3 className="help-card-title safe">
          <FaShieldAlt className="help-icon" />
          Safe Exchange Tips
        </h3>
        <ul>
          <li>Meet in public, well-lit locations with lots of foot traffic.</li>
          <li>Avoid late-night exchanges or isolated areas.</li>
          <li>Bring a friend if you can to add an extra layer of safety.</li>
        </ul>
      </div>

      {/* Payment Safety */}
      <div className="help-card payment">
        <h3 className="help-card-title payment">
          <FaMoneyCheckAlt className="help-icon" />
          Payment Safety
        </h3>
        <ul>
          <li>Use cashless options when possible (Venmo, Zelle, CashApp).</li>
          <li>Verify payment before handing over any item.</li>
          <li>Never send money ahead of time to a stranger.</li>
        </ul>
      </div>

      {/* Profile & Messaging Safety */}
      <div className="help-card profile">
        <h3 className="help-card-title profile">
          <FaUserShield className="help-icon" />
          Profile & Messaging Safety
        </h3>
        <ul>
          <li>Do NOT share passwords, personal documents, or private info.</li>
          <li>Report suspicious messages or users to the site admins.</li>
          <li>Trust your instincts — if something feels off, walk away.</li>
        </ul>
      </div>
    </div>
  );
}
