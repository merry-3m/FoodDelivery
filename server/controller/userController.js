// *  user controller to handle the incoming http request(interact with the use(front end))

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// ` login user

const loginUser = async (req,res)=>{
    // ` validate user input
    const {email, password} = req.body
    try {
        
        // ` check if user exist
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User not found"})
        }
        // ` compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message: "Invalid password"})
        }
        // ` generate jwt token
        const token = createToken(user._id)
        res.json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            message : "Failed to login user",
            success : false
        })
        
    }



}

// ` authenticate user

const createToken =  (id)=>{
    return jwt.sign({id},
        process.env.JWT_SECRET
    )
}

// ` register user

const registerUser = async (req,res)=>{ 
    // ` validate user input
    const {name, email, password} = req.body
    try {
        // ` check if user already exist
        const exist = await userModel.findOne({email})
        if(exist){
            return res.status(400).json({
                success:false,
                message: "User already exists"})
        }
        // ` validating email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message: "Invalid email format"})
        }
        if(password.length < 8){
            return res.status(400).json({
                success:false,
                message: "Password must be at least 8 characters."})
            
        }

        //` hashing user password
        const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password, salt)
        // ` create new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        // ` save user
       const user =  await newUser.save()

    // ` generate token
    const token = createToken(user._id)
    res.json({
        success:true,
        token: token
    })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message: "Server Error"})
        
    }

}

// ` authenticate user

export {loginUser,registerUser}