import express from "express";
const router = express.Router();
import {
    AllCategories,
  createCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
  parentCategories
} from "../controllers/categoryController";

router.route("/all").get(AllCategories);

router.route("/create").post(createCategory);
router.route("/parent/:id").get(parentCategories);
router.route("/:id").delete(DeleteCategory).get(GetCategory).put(UpdateCategory);
export default router;
