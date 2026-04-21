import { ConnectDB } from "../../../lib/config/db"
const {NextResponse}  = require("next/server")
const cloudinary = require('cloudinary').v2
import productModel from "../../../lib/models/productModel";


// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const LoadDB = async ()=>{
    await ConnectDB();

}

LoadDB();

//API Endpoint to get all products
export async function GET(request) {
    
    const products = await productModel.find({});
    return NextResponse.json({products})
    
}


// // API Endpoint for uploading products
// export async function POST(request) {
//     const formData = await request.formData();
//     const timestamp = Date.now();

//     const image = formData.get('image');
//     const imageByteData = await image.arrayBuffer();
//     const buffer = Buffer.from(imageByteData);

//     const path = `./public/${timestamp}_${image.name}`;
//     await writeFile(path,buffer);
//     const imageUrl = `/${timestamp}_${image.name}`;
//     const productData = {
//         title:`${formData.get(`title`)}`,
//         price:`${formData.get(`price`)}`,
//         category:`${formData.get(`category`)}`,
//         image:`${imageUrl}`,
//     }

//     await productModel.create(productData);
//     console.log("Product Saved")
//     return NextResponse.json({success:true,msg:"Product Added"})
// }

//Post Products
export async function POST(request) {
    try {
        const formData = await request.formData();
        const image = formData.get('image');

        // 1. Convert image to Buffer
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        // 2. Convert Buffer to Base64 for Cloudinary
        const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

        // 3. Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
            folder: "products", // Optional: organizes images in a folder
        });

        // 4. Save the Cloudinary Secure URL to DB
        const productData = {
            title: `${formData.get('title')}`,
            price: `${formData.get('price')}`,
            category: `${formData.get('category')}`,
            image: uploadResponse.secure_url, // This is your public link
        };

        await productModel.create(productData);
        
        return NextResponse.json({ success: true, msg: "Product Added" });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, msg: "Upload Failed" }, { status: 500 });
    }
}

//creating API Endpoint to delete product

// export async function DELETE(request){
//     const id = await request.nextUrl.searchParams.get('id');
//     const product = await productModel.findById(id); 
//     fs.unlink(`./public${product.image}`,()=>{});
//     await productModel.findByIdAndDelete(id);
//     return NextResponse.json({msg:"Blog Deleted"});
// }

export async function DELETE(request) {
    try {
        const id = await request.nextUrl.searchParams.get('id');
        const product = await productModel.findById(id);

        if (!product) {
            return NextResponse.json({ msg: "Product not found" }, { status: 404 });
        }

        // 1. Extract Public ID from the URL
        // Example URL: https://res.cloudinary.com/name/image/upload/v1/folder/image_id.jpg
        // We need: "folder/image_id"
        const imageUrl = product.image;
        const urlParts = imageUrl.split('/');
        const fileNameWithExtension = urlParts[urlParts.length - 1]; // "image_id.jpg"
        const publicIdWithoutExtension = fileNameWithExtension.split('.')[0]; // "image_id"
        
        // If you used a folder (e.g., 'products'), you need to include it:
        const publicId = `products/${publicIdWithoutExtension}`; 

        // 2. Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // 3. Delete from Database
        await productModel.findByIdAndDelete(id);

        return NextResponse.json({ msg: "Product and Image Deleted" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ msg: "Error deleting product" }, { status: 500 });
    }
}

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser is sometimes necessary for FormData
    sizeLimit: '10mb', // Set this to 10mb or higher
  },
};