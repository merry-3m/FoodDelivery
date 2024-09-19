import React from "react";
import "./footer.css";
import { assets } from "../../assets/images/assets";
const Footer = () => {
  return <div className="footer" id="footer">
    <div className="footer_content">
        {/* left content */}
        <div className="footer_content_left">
            <img src={assets.logo} alt="logo" />
            <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your craving and elevate your dining
            experience, one delicious meal at a time.
          </p>
          {/* social media icons */}
          <div className="footer_social_icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />

          </div>
        </div>
        {/* center content */}
        <div className="footer_content_center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>

        </div>
        {/* right content */}
        <div className="footer_content_right">
            <h2>Get in touch</h2>
            <ul>
                <li>+1-212-345-6789</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
    </div>
    <hr />
    <p className="footer_copyright">Copyright 2024 @ Tomato.com - All Right Reserved</p>
  </div>;
};

export default Footer;
