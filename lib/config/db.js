import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Rakesh:hero123@cluster0.erfhm6n.mongodb.net/aarucreative-products')
    console.log("DB connected")
}