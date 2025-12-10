import "../css/Dashboard.css";
import "../css/App.css";
import "../index.css";
import "../css/LandingPage.css"

export function LandingPage() {
    return (
    <div className="page-container">
      <div className="page-card">
        <h1 className="page-title">Announcements</h1>

        <ul className="announcement-list">
          <li>
            🎯 Meet in public spaces like{" "}
            <a
              href="https://maps.app.goo.gl/GvCzBEr5rzHadJnN8"
              target="_blank"
              rel="noreferrer"
              className="page-link"
            >
              Milo Bail Student Center
            </a>.
          </li>

          <li>
            🔐 Never share passwords or sensitive info in messages.
          </li>

          <li>
            💵 Prefer cashless payment methods and confirm payment before handing over items.
          </li>

          <li>
            👀 Always inspect items before finalizing a trade/transaction.
          </li>

          <li>
            📞 If something seems suspicious, report it to campus security.
          </li>
        </ul>
      </div>
    </div>
  );
}