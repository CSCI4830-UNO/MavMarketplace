import mavLogo from "./assets/mav-logo.png";
import "./css/App.css";
import Listing from "./components/Listing";

function App() {
  return (
    <>
      <div>
        <img src={mavLogo} className="logo" alt="Mav logo" />
      </div>
      <h1>Mav-Marketplace</h1>
      <h2>Components:</h2>
      <div className="components">
        <Listing />
      </div>
    </>
  );
}

export default App;
