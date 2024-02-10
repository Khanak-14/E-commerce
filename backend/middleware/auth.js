const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthUser=catchAsyncErrors(async(req,res,next)=>{

    const {token} =req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login To access",401))
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);


   req.user= await User.findById(decodedData.id);

   next();

});

const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
     if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role:${req.user.role}is not allowed to access`,403)
     )}

    next(); 
}}


module.exports={ isAuthUser, authorizeRoles};
