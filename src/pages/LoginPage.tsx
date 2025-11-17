import "../css/LoginPage.css";

export function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src="src\assets\uno-o-icon-color.png" alt="Uno Logo" className="login-logo" />
        <h2 className="login-title">Sign In</h2>
        //Email entry field 
        <input type="text" placeholder="Email (ex. user@unomaha.edu)" className="login-input" />
        //Password entry field
        <input type="password" placeholder="Password" className="login-input" />
        <button className="login-button">Sign In</button>
        <div className="login-reset">
          //Will eventually route user to a create account page
          <a href="#">New? Create an account!</a>
          //Possible help page/password recovery functionality
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}
