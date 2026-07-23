import mongoose from 'mongoose';


export const connectDB=async()=>{
    try {

        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected ${conn.connection.host}`);
        console.log("Connected to DB:", mongoose.connection.name);
      
        
    } catch (error) {
        console.log("mongodb connection error",error);
    }
}