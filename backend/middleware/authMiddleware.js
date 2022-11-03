import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import user from '../models/userModel'
import User from '../models/userModel';

const protect = asyncHandler(async (req,res)=>{
  let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try{
           token = req.headers.authorization.split(' ')[1];
           const decoded = jwt.verify(token,process.send.JWT_SECRET);
           req.user = await User.findById(decoded.id).select('-password');
           next();

       } catch {
           res.status(401)
           throw new Error('Not authorized, token failed')
       }
   }

   if(!token){
       res.status(401);
       throw new Error('No authorized, no token')
   }
});

const admin = (req,res,next)=>{
if(req.user && req.user.isAdmin){
    next();
} else {
    res.status(401)
    throw new Error('Not authrized as an admin');
}
}

export { protect , admin}