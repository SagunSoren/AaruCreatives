import { title } from "process";
import { ConnectDB } from "../../../lib/config/db"
const {NextResponse}  = require("next/server")
import { writeFile } from "fs/promises";
import productModel from "../../../lib/models/productModel";

const fs = require('fs')

const LoadDB = async ()=>{
    await ConnectDB();

}

LoadDB();

//API Endpoint to get all products
export async function GET(request) {
    
    const products = await productModel.find({});
    return NextResponse.json({products})
    
}


// API Endpoint for uploading products
export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imageUrl = `/${timestamp}_${image.name}`;
    const productData = {
        title:`${formData.get(`title`)}`,
        price:`${formData.get(`price`)}`,
        category:`${formData.get(`category`)}`,
        image:`${imageUrl}`,
    }

    await productModel.create(productData);
    console.log("Product Saved")
    return NextResponse.json({success:true,msg:"Product Added"})
}

//creating API Endpoint to delete product

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const product = await productModel.findById(id); 
    fs.unlink(`./public${product.image}`,()=>{});
    await productModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"});
}