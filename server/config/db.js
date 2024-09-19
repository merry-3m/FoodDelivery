// ` import mongoose

 import mongoose from 'mongoose'

//  ` connectDb function

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://merrystack:merrystack1234@cluster0.ujgyq.mongodb.net/food-del')
    .then(()=>{
        console.log('MongoDB connected')
    })

}