import mongoose from 'mongoose'

const prodcutSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,      
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    images:[{
        image:{
            type:String,
        }
    }],
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    category:{
        type:Number,
        required:false,
    },
    featured:{
        type:Number,
        default:'0'
    },
    new:{
        type:Number,
        default:'0'
    },
    status:{
        type:Number,
        default:'0'
    },
    meta_title:{
        type:String,
        required:true,
    },
    meta_description:{
        type:String,
        required:true,
    },
    meta_keywords:{
        type:String,
        required:true,
    },
    

}, { timestamps: true });
const Prodcut = mongoose.model('Product',prodcutSchema);

export default Prodcut;