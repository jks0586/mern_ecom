import mongoose from 'mongoose'

const testSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,      
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    // description:{
    //     type:String,
    //     require:true,
    // },
    // image:{
    //     type:String,
    //     require:true,
    // },
    // images:[{
    //     image:{
    //         type:String,
    //     }
    // }],
    // price:{
    //     type:Number,
    //     require:true,
    // },
    // quantity:{
    //     type:Number,
    //     require:true,
    // },
    // category:{
    //     type:Number,
    //     require:false,
    // },
    // featured:{
    //     type:Number,
    //     default:'0'
    // },
    // new:{
    //     type:Number,
    //     default:'0'
    // },
    // status:{
    //     type:Number,
    //     default:'0'
    // },
    // meta_title:{
    //     type:String,
    //     require:true,
    // },
    // meta_description:{
    //     type:String,
    //     require:true,
    // },
    // meta_keyword:{
    //     type:String,
    //     require:true,
    // },
    

}, { timestamps: true });
const Test = mongoose.model('jitendra',testSchema);

export default Test;