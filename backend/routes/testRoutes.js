import express from "express";
const router = express.Router();
import { createTest } from "../controllers/testController";

//router.route("/create").get(createTest);
router.route("/create").get(createTest);

export default router;
