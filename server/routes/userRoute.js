// * userRoute define the end points that the client can access


import express from "express"
import { loginUser,registerUser } from "../controller/userController.js"

// ` create a route

const userRouter = express.Router()

// ` user registration route
userRouter.post("/register", registerUser)

// ` user login route
userRouter.post("/login", loginUser)

export default userRouter

// * foodRoute define the end points that the client can access