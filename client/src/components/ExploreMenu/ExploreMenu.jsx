import React from "react";
import "./exploreMenu.css";
import { menu_list } from "../../assets/images/assets";
const ExploreMenu = ({ category, setCategory }) => {

  //` set the category on click. so when the food item got clicked the category props will take that foodItem name
  
  console.log(category);
  
  return (
    <div className="explore_menu" id="explore_menu">
      <h1>Explore our menu</h1>
      <p className="explore_menu_text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craving and elevate your dining experience,
        one delicious meal at a time
      </p>
      <div className="explore_menu_list">
        {/* mapping the menu list from asset */}
        {menu_list.map((item, i) => (
            // ` set the category on click
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={i} className="explore_menu_list_item">
            {/* menu image */}
            <img className={category === item.menu_name? "active": ""} src={item.menu_image} alt={item.menu_name} />
            {/* menu name */}
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
