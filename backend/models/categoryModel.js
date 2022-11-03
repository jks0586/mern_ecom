import mongoose from 'mongoose'


const catgeorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true
    },
    parent_id:{
        type:String,
        default:''
    },
    order:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    }
});


const Category = mongoose.model('Category',catgeorySchema);

export default Category;