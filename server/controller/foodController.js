// *  foodController to handle the incoming http request(interact with the use(front end))
import { trusted } from "mongoose"
import foodModel from "../models/foodModel.js"

// ` import file system
import fs from "fs"

// ` add food item
const addFood = async (req,res)=>{

    // ` store the name of the uploaded image
    let image_filename = `${req.file.filename}`

    // ` create a new food item
    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        image : image_filename,
        category : req.body.category,
    })

    try {
        // ` save the food item to the database
        await food.save()
        res.status(200).json({
            message : "Food item added successfully",
            success : true
        })
    } catch (error) {
        console.log(error);
        res.json({
            message : "Failed to add food item",
            success : false
        })
        
    }


}

// ` get all food items

const listFood = async (req,res)=>{

    try {
        // ` find all food items from the database  (find({}) means select all)  and return them as a response to the client.
        const foods = await foodModel.find({})
        res.status(200).json({
            data:foods,
            success : true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Failed to get food items",
            success : false
        })   
    }

}

// ` remove food item
const removeFood = async (req, res)=>{
   try {
    
     // ` find the food item by its id 
     const food = await foodModel.findById(req.body.id)
    //  ` delete the image from uploads folder
    fs.unlink(`uploads/${food.image}`, ()=>{})


 // ` find the food item by its id and remove it from the database
    await foodModel.findByIdAndDelete(req.body.id)
    res.status(200).json({
      message : "Food item removed successfully",
      success : true
    })
     
   } catch (error) {
    console.log(error);
    res.status(500).json({
      message : "Failed to remove food item",
      success : false
    })
    
   }


}
export {addFood,listFood, removeFood}