import mongoose from "mongoose"

// ` create schema for our user data base

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },  
}, {minimize:false})

// ` create model using schema

const userModel = mongoose.model.user || mongoose.model("user", userSchema)

export default userModel

// ` when we import this model, it will be able to interact with our database for user data