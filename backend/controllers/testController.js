import expressAsyncHandler from "express-async-handler";
import Test from "../models/testModel";

const createTest = expressAsyncHandler(async (req,res)=>{
        //console.log(req.body);
        const postdata={
            name:'',
            phone:'4521',
        }
        // console.log(postdata);
        await Test.create(postdata, (error) => {
            if (error) {
                
                let ferrors = [];
                Object.values(error.errors).map(el => ferrors[el.path]=el.message);
                return ferrors;
            }
            
        });
        
})


export {createTest};