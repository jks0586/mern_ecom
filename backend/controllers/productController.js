import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

const allProducts = asyncHandler(async (req, res) => {
  console.log(req);
  const products = await Product.find({});
 
  res.json(products);
});

const editProduct = asyncHandler(async (req,res)=>{
  res.letscmsresponse({
    code: 400,
    message: "Invalid product data",
    errors: ferrors,
  });
});
const createProduct = asyncHandler(async (req, res) => {
  const postdata = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    images: req.body.images,
    meta_description: req.body.meta_description,
    meta_keywords: req.body.meta_keywords,
    meta_title: req.body.meta_title,
    price: req.body.price,
    quantity: req.body.quantity,
  };
  await Product.create(postdata, (error) => {
    if (error) {
      var ferrors = {};
      Object.values(error.errors).map((el) => (ferrors[el.path] = el.message));
      res.letscmsresponse({
        code: 400,
        message: "Invalid product data",
        errors: ferrors,
      });
    } else {
      res.letscmsresponse({
        message: "Prodcut Created Successfully",
      });
    }
  });
});

export { createProduct, allProducts,editProduct };
