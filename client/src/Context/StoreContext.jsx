import axios from "axios";
import { createContext, useEffect, useState } from "react";
// ` import the food list from assets
// import { food_list } from "../assets/images/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // ` back end url
  const url = "https://food-delivery-backend-dpw6.onrender.com/";
  // ` store token
  const [token, setToken] = useState("");
  // `cart item state
  const [cartItems, setCartItems] = useState({});
  // ` food list state
  const [food_list, setFood_list] = useState([]);

  // ! itemId is the key in cartItems object not an array (cartItems[itemId] = cartItems.itemId). it's value is gonna be a number

  // * add item to the shopping cart  functionality
  const addToCart =  async (itemId) => {
    // ` Check if the item is already in the cart,  if the item with itemId object property is not in the cartItems
    if (!cartItems[itemId]) {
      // ` so when the first time the item is added this function will create a new object property called itemId with the value 1

      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // ` so when the user add that item more than one time the value '1' in itemId property will increase
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // ` update the cart in the server
    if(token){
      await axios.post(`${url}/api/cart/add`,  { itemId},{
        headers: {token},
      })

    }
  };

  // * remove item from cart functionality
  const removeFromCart = async (itemId) => {
    // `This function decreases the quantity of an item in the shopping cart by 1.
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
   ;
    // ` remove from server
    if(token){
      await axios.post(`${url}/api/cart/remove`,  { itemId},{
        headers: {token},
      })
  }
  }
  // useEffect(()=>{
  //    console.log( cartItems );
  //   //  ` this will log
  //   // : {id Of The Item : the Amount Of The Item Got Clicked} eg =>  {   1    :   2       }
  // },[cartItems])

  // ` get total cart amount

  const getTotalCartAmount = () => {
    // ` initialize the totalAmount
    let totalAmount = 0;
    // ` loop through the cart items ("item"=> represent "product id")
    for (const item in cartItems) {
      // ` check the quantity of current items ([item]=> represent the quantity of product)
      if (cartItems[item] > 0) {
        // ` find the item info by its id in food_list array
        let itemInfo = food_list.find((product) => product._id === item);
        // ` add the price of current item multiplied by its quantity to the total amount
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with id ${item} not found in food_list`);
        }
      }
    }
    // ` get items from 
    return totalAmount;
  };

  // ` get food list from the server
  const fetchFoodList = async () => {
    try {
      const response = await axios(`${url}/api/food/list`);
      setFood_list(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  
 

  // ` to display the quantity of item even if the page reload
  const loadCartData = async ()=>{
    const token = localStorage.getItem("token");
    const response = await axios.post(`${url}/api/cart/get`,{},{
      headers: { token }
    })
    // console.log("Response data:", response.data);
    setCartItems(response.data.cartData);
    
    
  }


   // ` get user token from local storage so the log in will not change when the page reload
   useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      // console.log("Stored token:", storedToken); 
      if (storedToken) {
        setToken(storedToken);
        await loadCartData()
      }
    }
    loadData();
  }, []);



  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  //` when pass contextValue in a value, it means we can access it in any function by using context
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

// ! add this in documentation

// : In the context of the getTotalCartAmount function, item represents the key in the cartItems object. Typically, this key is the product ID, which uniquely identifies each item in the cart.

// Example Context:
// javascript
// Copy code
// const cartItems = {
//   "1": 2, // Product ID "1" with quantity 2
//   "2": 1  // Product ID "2" with quantity 1
// };
// Explanation:
// item in the loop:
// javascript
// Copy code
// for (const item in cartItems) {
// The for...in loop iterates over the keys in the cartItems object. In this example, item will first be "1" and then "2" on the next iteration.
// cartItems[item]:
// javascript
// Copy code
// if (cartItems[item] > 0) {
// cartItems[item] accesses the value associated with the key item in the cartItems object.
// For item = "1", cartItems[item] would be 2, which is the quantity of the product with ID "1" in the cart.
// For item = "2", cartItems[item] would be 1, which is the quantity of the product with ID "2" in the cart.
// Summary:
// The item represents the product ID in the cartItems object.
// cartItems[item] retrieves the quantity of that product in the cart.
