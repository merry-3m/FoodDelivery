
import express from "express"
import {placeOrder, userOrders, verifyOrder,listOrders,updateStatus } from "../controller/orderController.js"
import authMiddleware from "../middleware/auth.js"


// ` create a route
const orderRouter = express.Router()


// ` place order
orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/user-orders", authMiddleware, userOrders)
orderRouter.post("/verify", verifyOrder)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

// export
 export default orderRouter;


