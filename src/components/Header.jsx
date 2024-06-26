import React, { useContext } from "react";
import OlxLogo from "../assets/OlxLogo";
import Search from "../assets/Search";
import Arrow from "../assets/Arrow";
import SellButton from "../assets/SellButton";
import SellButtonPlus from "../assets/SellButtonPlus";
import { AuthContext } from "../store/AuthContext";
import { FirebaseContext } from "../store/firebaseContext";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Header({searchText, setSearchText}) {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();


  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleLogout = () => {
    const auth = getAuth(firebase);
    auth.signOut();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user ? (
              user.email
            ) : (
              <span style={{ cursor: "pointer" }} onClick={handleLogin}>
                Login
              </span>
            )}
          </span>

          <hr />
        </div>

        {user && (
          <span style={{ cursor: "pointer" }} onClick={handleLogout}>
            Logout
          </span>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div
            className="sellMenuContent"
            onClick={() => {
              navigate("/create");
            }}
          >
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
