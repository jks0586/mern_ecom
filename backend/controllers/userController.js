import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc   Auth user and get token
// @route        POST /api/users/login
// @access       Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const userExist = await User.findOne({ email });
//   res.send(email);
  if (userExist) {
    res.letscmsresponse({
      status:400,
      message:'User already exist',
    })
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.letscmsresponse({
      status:200,
      data:{user:user,token:generateToken(user._id)},
      message:'Suucessfully Register User',
    })

    // res.status(200).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   token: generateToken(user._id),
    // });
  } else {
    res.letscmsresponse({
      status:400,
      message:'Invalid user data',
    })
    
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.letscmsresponse({
      status:400,
      data:{user:user},
      message:'Invalid user data',
    })
    // res.json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    // });
  } else {
    res.letscmsresponse({
      status:404,
      message:'User Not Found',
    })
    // res.status(404);
    // throw new Error("User Not Found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    // res.json({
    //   _id: updatedUser._id,
    //   name: updatedUser.name,
    //   email: updatedUser.email,
    //   isAdmin: updatedUser.isAdmin,
    //   token: generateToken(updatedUser._id),
    // });

    res.letscmsresponse({
      status:200,
      data:{user:updatedUser,token:generateToken(updatedUser._id)},
      message:'User Updated Successfully',
    })

  } else {
    res.letscmsresponse({
      status:404,
      message:'User not found',
    })

    // res.status(404);
    // throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.letscmsresponse({
      status:200,
      message:'User removed successfully',
    })
    // res.json({ message: "User removed" });
  } else {
    res.letscmsresponse({
      status:404,
      message:'User Not Found',
    })
    // res.status(404);
    // throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.letscmsresponse({
      status:200,
      data:{user:user},
      message:'User Not Found',
    })
    // res.json(user);
  } else {

    res.letscmsresponse({
      status:404,
      message:'User not found',
    })

    // res.status(404);
    // throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.letscmsresponse({
      status:200,
      data:{user:updatedUser},
      message:'Get result',
    })

    // res.json({
    //   _id: updatedUser._id,
    //   name: updatedUser.name,
    //   email: updatedUser.email,
    //   isAdmin: updatedUser.isAdmin,
    // });
  } else {
    res.letscmsresponse({
      status:404,
      message:'User not found',
    })
    // res.status(404);
    // throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
