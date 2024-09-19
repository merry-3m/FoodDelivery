import React, { useContext, useState } from "react";
import "./foodItem.css";
import { assets } from "../../assets/images/assets";
import { StoreContext } from "../../Context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
 

  // ` add to cart access from context to manage item count globally 
  const {addToCart, cartItems,removeFromCart,url } = useContext(StoreContext)

  
  return (
    <div className="food_item">
      {/* image container */}
      <div className="food_item_img_container">
        <img className="food_item_image" src={`${url}/images/${image}`} alt="" />
        {/* item count */}
        {
          // ` if item count is zero (!itemCount-> means false == 0`) which is the initial value
        !cartItems[id]  
        // ` when the img got clicked it'll increase the itemCount from 0 to 1
        ? <img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} /> 
        // ` if the itemCount is greater than 0 (truly)
        : <div className="food_item_counter">
          {/*  to decrease the itemCount  */}
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            {/*  to increase the itemCount  */}
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
          }
      </div>
      {/* item info */}
      <div className="food_item_info">
        <div className="food_tem_name_rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food_item_desc">{description}</p>
        <p className="food_tem_price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
