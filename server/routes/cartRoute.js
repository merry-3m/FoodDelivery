// * cartRoute define the end points that the client can access


import express from "express"
import {addToCart,removeFromCart,getCart } from "../controller/cartController.js"
import authMiddleware from "../middleware/auth.js"

// ` create a route
const cartRouter = express.Router()


// ` add item to cart route
cartRouter.post("/add", authMiddleware, addToCart)

// ` remove item from cart route
cartRouter.post("/remove", authMiddleware,removeFromCart)

// ` get cart data
cartRouter.post("/get", authMiddleware,getCart)

export default cartRouter