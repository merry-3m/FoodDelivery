// *
import mongoose from 'mongoose'

// ` create schema
const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    items:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, default:'Food Processing'},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false},   
})

// ` create model from schema

const orderModel = mongoose.model.order || mongoose.model('order', orderSchema)

export default orderModel

//  when we import this model, it will be able to interact with our database for order data