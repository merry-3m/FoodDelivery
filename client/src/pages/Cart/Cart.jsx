import React, { useContext } from "react";
import "./cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  // ` access the item info from context
  const { addToCart, cartItems, removeFromCart, food_list,getTotalCartAmount, url } =
    useContext(StoreContext);

    // ` navigate to place order page
    const navigate = useNavigate()

  return (
    <div className="cart">
      <div className="cart_items">
        <div className="cart_items_title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, i) => {
          // ` food list will be returned if the item is in cart
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div className="cart_items_title cart_items_item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      {/* cart */}
      <div className="cart_bottom">
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
              <b>${ getTotalCartAmount() === 0 ?0 :getTotalCartAmount() + 2}</b>
            </div>
          </div>{" "}
          <button onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        {/* promo code */}
        <div className="cart_promoCode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart_promoCode_input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
