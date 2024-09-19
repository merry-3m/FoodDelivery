// * To store the products in data base (interact with the data base)
import mongoose from 'mongoose'

// ` create schema to describe food model property

const foodSchema = new mongoose.Schema({
    // ` the type , it's required
    name: {type: String, required :true},
    description : {type: String, required :true},
    price : {type: Number, required :true},
    image : {type: String, required :true},
    category : {type: String, required :true},
})

// ` create model from schema
// : if the model(column) food is already there it will just add the property but if the model is not created it will create the model

const foodModel =mongoose.model.food || mongoose.model("food", foodSchema)

export default foodModel