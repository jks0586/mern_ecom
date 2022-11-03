import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const options = {
            autoIndex: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 ,
            
          }

        const conn= await mongoose.connect(process.env.MONGO_URL,options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error){
        
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;