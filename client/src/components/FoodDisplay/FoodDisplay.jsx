import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category, setCategory }) => {
  // ` we will try to access the food list from the context component by using useContext

  const { food_list } = useContext(StoreContext);

  return (
    <div className="food_display" id="food_display">
      <h2>Top dishes near you</h2>
      {/* map the food list and pass the info to the food item component */}
      <div className="fod_display_list">
        {food_list.map((item, i) => {
          // ` check if the item is in the selected category or not
          if(category === "All" ||category === item.category){
return (
            <FoodItem
              key={i}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
          }
          
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
