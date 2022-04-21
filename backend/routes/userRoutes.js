import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController";

import { protect, admin } from "../middleware/authMiddleware";

router.route("/test").get((req,res)=>{
    res.send('this is test');
    
});
router.route("/register").post(registerUser);
router.route("/all").get(getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
// router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);
export default router;