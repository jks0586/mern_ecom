import express from "express";
const router = express.Router();
import { 
    createProduct, 
    allProducts,
    editProduct 
} from "../controllers/productController";

router.route("/all").get(allProducts);
router.route("/create").post(createProduct);
router.route("/edit").post(editProduct);

export default router;
