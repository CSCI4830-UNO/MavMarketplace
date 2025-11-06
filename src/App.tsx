import mavLogo from "./assets/mav-logo.png";
import "./css/App.css";
import Listing from "./components/Listing";
import Dashboard from "./components/Dashboard";

/*
function App() {
  return (
    <>
      <div className="logo-container">
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
*/

function App() {
  return (
    <>
      <Dashboard />
    </>
  );
}
export default App;
