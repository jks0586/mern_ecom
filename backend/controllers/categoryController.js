import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel";

const AllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});
const parentCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({_id: { $ne: req.params.id }});
  // console.log(categories)
  res.json(categories);
});

const GetCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({_id:req.params.id});
  
    if (!category){
      res.letscmsresponse({
          status:400,
          message:'Invalid category Id',
          errors:error
        })
      // return res.status(400).json({message:"Can not perform find operation.", error: error });
    } else {
        res.letscmsresponse({
          result:category,
          status:200,
          message:'Category Find',
        })
    } 

  
});

const UpdateCategory = asyncHandler(async (req, res) => {
  // console.log(req.body._id);
  // console.log(req.body.image.props.src);

  const category = await Category.findOne({_id:req.body._id});
  const postdata={
      name: req.body.name,
      image:req.body.image,
      parent_id:req.body.parent_id,
      order:req.body.order,
      status:req.body.status

  };
  // console.log(postdata);

  await category.updateOne(postdata);

  res.letscmsresponse({
    result:category,
    status:200,
    message:'Category Updated',
  })

// console.table(category);
  
});

const DeleteCategory = asyncHandler(async (req, res) => {
  console.log(req.body);
  
});

const createCategory = asyncHandler(async (req, res) => {
  // console.log(req.body);
    const { name, image, parent_id,order } = req.body;
  
   const category = await Category.create({
        name,
        image,
        parent_id,
        order
      });

    if(category){
      res.letscmsresponse({
        result:category,
        status:200,
        message:'This is testing for the function check',
      })
        // res.status(200).json(category);
    } else {
      res.letscmsresponse({
        status:400,
        message:'Invalid category data',
      })
    }
});

export { AllCategories, createCategory,GetCategory, UpdateCategory,DeleteCategory,parentCategories };
