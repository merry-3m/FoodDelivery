import React, { useContext, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom'
import axios from "axios";
const PlaceOrder = () => {
  const navigate = useNavigate()
  const { getTotalCartAmount, cartItems, url, token,food_list } =
    useContext(StoreContext);
  // ` state to store the info in this file
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  // ` on change handler to store the input value in the above state
  const onChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [key]: value,
    }));
  };

  //` to verify it
//  useEffect(() => {
//    console.log(data)
//  }, [data])
 

// ` to redirect payment gateway
const placeOrder = async (e)=>{
  e.preventDefault()
  const orderItems = []
  // ` map through the food_list
  food_list.map((item, index) => {
    // ` check if the food item is available. cartItems contain the foodItem id and it's amount
    if (cartItems[item._id] > 0) {
      // ` item contain the info of each food
      let itemInfo = item 
      //` itemInfo["quantity"] contain the amount of food that's ordered, cartItems[item._id] also contain the amount of food that's ordered. so they are equal
      itemInfo["quantity"] = cartItems[item._id]
      orderItems.push(itemInfo)
    }
  })

// console.log("orderItems", orderItems);
// ` prepare orderData to send it to server
let orderData = {
  address:data, 
  items:orderItems,
  amount:getTotalCartAmount() + 2 //: add delivery fee 
}

// ` send the orderData to server
let response = await axios.post(`${url}/api/order/place`,orderData,
  {
    headers: {token}
  }
)

// ` check if the response is success
if(response.data.success){
  // ` redirect to payment gateway
  const {session_url} = response.data

  window.location.replace(session_url)
} else{
  // ` show error message
  toast.error("Error placing order")

}
}

// ` if we log out we can't see order page
useEffect(()=>{
  if(!token){
    // ` navigate to cart page
    navigate("/cart")
    toast.error("You need to login to place order")
  }else if(getTotalCartAmount() == 0){
    // ` when cart page is empty
    navigate("/cart")
    toast.error("Cart is empty")
  }

},[token])

  return (
    <form onSubmit={placeOrder} className="place_order">
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        {/*  */}
        <div className="multi_fields">
          <input 
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        {/*  */}
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        {/*  */}
        <div className="multi_fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        {/*  */}
        <div className="multi_fields">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        {/*  */}
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="tel"
          placeholder="Phone"
        />
      </div>
      <div className="place_order_right">
        <div className="cart_total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>{" "}
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
