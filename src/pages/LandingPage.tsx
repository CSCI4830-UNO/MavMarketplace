import "../css/Dashboard.css";
import "../css/App.css";
import "../index.css";

export function LandingPage() {
    return (
      <section className="dash__announcements">
        <h2>Announcements</h2>
        <ul>
          <li>🎯 Meet in public spaces like <a href="https://shorturl.at/1tZbw" target="_blank" rel="noreferrer">Milo Bail Student Center</a>.</li>
          <li>🔐 Never share passwords or sensitive info in messages.</li>
          <li>💵 Prefer cashless options and confirm payment before handing over items.</li>
        </ul>
      </section>
    );
  }