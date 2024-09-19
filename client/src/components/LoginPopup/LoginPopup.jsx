import React, { useContext, useEffect, useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/images/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const{url, token, setToken} = useContext(StoreContext)
  // ` state for sign up or login
  const [currentState, setCurrentState] = useState("Login");
  // ` state to store user data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // ` to handle the input change
  const onChangeHandler = (e) => {
    // ` save the data
    const key = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

//   useEffect(()=>{
//     console.log(data);
    
//   },[data])
  // ` to handle the login submit
  const onLogin = async (e) => {
    e.preventDefault();
    //` fetch api
    let newUrl = url

    if (currentState === "Login") {
      newUrl = `${url}/api/user/login`;
    } else {
      newUrl = `${url}/api/user/register`;
    }
    // ` call api
    const response = await axios.post(newUrl, data);
    // ` if the response is ok, show success message
    if (response.data.success) {
        // ` save the token
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token) //:hide login page
      toast.success(response?.data?.message);
      // ` reset the form
      setData({
        name: "",
        email: "",
        password: "",
      });
      setShowLogin(false);
    } else {
      toast.error(response?.data?.message);
    }
    
  };

  return (
    <div className="login_popup">
      <form onSubmit={onLogin} className="login_popup_container">
        {/* login title */}
        <div className="login_popup_title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login_popup_inputs">
          {/* name */}
          {currentState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          {/* email */}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          {/* password */}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {/* submit button */}
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Log in"}
        </button>
        {/* term and condition */}

        <div className="login_popup_condition">
          <input type="checkbox" required />
          <p>I agree to the Terms and Conditions</p>
        </div>

        {/* login or signup change */}
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Log in</span>
          </p>
        ) : (
          <p>
            {" "}
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        )}

        {/* or */}
      </form>
    </div>
  );
};

export default LoginPopup;
