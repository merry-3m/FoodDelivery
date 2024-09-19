// * foodRoute define the end points that the client can access

// ` import express, addFood, multer

import express from "express"
import {addFood,listFood, removeFood} from "../controller/foodController.js"
import multer from "multer"


// ` create a route

const foodRouter = express.Router()

// ` image storage Engine
// : when the food added the image file will be uploaded in uploads folder
const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`)
        }
})

// ` upload image middleware
const upload = multer({storage : storage})

// : when the food added it will has the name image in mongo db
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)





export default foodRouter