// ` express server

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// ` app config
const app = express()


// ` port 
const port = process.env.PORT || 3000

// ! the middleware should be before the route

// ` middleware
app.use(express.json()) //: when there is request from front end to back end  it'll be parsed by json
 app.use(express.urlencoded({ extended: true }))  //: for form data
 
app.use(cors()) //: to allow cross origin request. And access back end from any front end


// ` api end point 

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)



// ` db connection
connectDB()

// : get is http request method to request data from server

app.get("/", (req,res)=>{
    res.send("Hello from server")
})


// ` listener
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


