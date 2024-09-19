import React, { useContext, useState } from "react";
import "./navBar.css";
import { assets } from "../../assets/images/assets";

import { Link } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const NavBar = ({ setShowLogin }) => {
  // ` underline effect for menu items
  const [menu, setMenu] = useState("menu");
  // ` access item count from context
  const { getTotalCartAmount, token, setToken,setCartItems } = useContext(StoreContext);
  const navigate = useNavigate()
  // ` logout
  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
    setCartItems({});
  };
  return (
    <div className="navBar">
      {/* logo */}
      <RouterLink to={"/"}>
        <img src={assets.logo} alt="logo" className="logo" />
      </RouterLink>

      {/* menu items */}
      <ul className="navbar_menu">
        <Link
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
          spy={true}
          smooth={true}
          duration={500}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
          spy={true}
          smooth={true}
          duration={500}
          to="explore_menu"
        >
          Menu
        </Link>
        <Link
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
          spy={true}
          smooth={true}
          duration={500}
          to="app_download"
        >
          Mobile-App
        </Link>
        <Link
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
          spy={true}
          smooth={true}
          duration={500}
          to="footer"
        >
          Contact Us
        </Link>
      </ul>
      {/* search */}
      <div className="navbar_right">
        <img src={assets.search_icon} alt="search icon" />
        {/* basket */}
        <div className="navbar_search_icon">
          <RouterLink to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </RouterLink>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}> </div>
        </div>
        {/*  */}

        {/* sign in */}
        {token ? (
          <div className="navbar_profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav_profile_dropdown">
              <li onClick={()=>navigate("/my-orders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}> Sign in</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
