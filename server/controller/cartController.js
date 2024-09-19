// *  cart controller to handle the incoming http request(interact with the use(front end))

import userModel from "../models/userModel.js";

// ` add items to user cart

const addToCart = async (req,res)=>{
    // console.log(req.body.itemId);
    // findOne({_id:req.body.userId})
    try {
     // ` user data
     let userData = await userModel.findById(req.body.userId)
     // ` check if the user exists in the database
     if (!userData) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    //  ` extract cart data (cartData is from userModel)
    let cart = userData.cartData || {}
    // ` check if the product is already in the cart
    if(!cart[req.body.itemId]){

        // ` if not, add the product with quantity 1
        cart[req.body.itemId] = 1;
    } else{
        // ` if yes, increase the quantity by 1
        cart[req.body.itemId] += 1;
    }
    // ` save the updated cart to the user model
    await userModel.findByIdAndUpdate(req.body.userId,{
        cartData:cart
    })
    res.status(200).json({
        message : "Item added to cart successfully",
        success : true
    })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Failed to add item to cart",
            success : false
        })
        
    }

}

// ` remove items from user cart

const removeFromCart = async (req,res)=>{
    try {
        // ` user data
        let userData = await userModel.findById(req.body.userId)
        // ` extract cart data (cartData is from userModel)
        let cart = await userData.cartData
        // ` check if the product exists in the cart
        if(cart[req.body.itemId] > 0){
            // ` if yes, decrease the quantity by 1
            cart[req.body.itemId] -= 1;
        }
        // ` save the updated cart to the user model
        await userModel.findByIdAndUpdate(req.body.userId,{
            cartData:cart
        })
        res.status(200).json({
            message : "Removed From Cart",
            success : true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Failed to remove item from cart",
            success : false
        })
        
    }

}


// ` fetch  user cart data

const getCart = async (req,res)=>{
    try {
        // ` user data
        let  userData = await userModel.findById(req.body.userId)
        // ` extract cart data (cartData is from userModel)
        let cart = await userData.cartData
        res.status(200).json({
            cartData : cart,
            success : true
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Failed to get cart data",
            success : false
        })

        
    }

}

// ` get total price of user cart



export {addToCart,removeFromCart,getCart}