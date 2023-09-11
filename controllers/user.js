const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');
const User = require('../models/userModel'); 
const VerificationToken = require('../models/verificationToken');
const ResetToken = require('../models/resetToken');
const { sendError ,createRandomBytes } = require('../utils/helper');
const { generateOTP, mailTransport, generateEmailTamplate ,
  generateEmailTamplateSuccess ,generateEmailTamplateResetpasswordSuccess ,
  generateEmailTamplateResetpassword } = require('../utils/mail');
   

exports.createUser = async (req, res) => {
    const { name, email, password ,phone} = req.body; 
    try{
      const isNewUser = await User.isThisEmailInUse(email);
      if (!isNewUser) return sendError(res,'This email is already in use, try sign-in');
      const currentUser = await User({
        name,
        email,
        phone,
        password
      });    
      await currentUser.save();  
      res.json({ success: true, currentUser , message: "User registered successfully"}); 
    }catch(errors){ 
      return res.status(400).json({success: false ,message:"Failed to register user please fill up the requirement"}); 
    }    
}; 
 
exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email }); 
    if (!user) return sendError(res,'user not found, with the given email');
       
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return sendError(res,'email / password does not match');
 
    const token = jwt.sign({ userId: user._id }, "DFDFJL43243lkfajsdf", {
      expiresIn: '1d',
    });  
    const currentUser = { 
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        verified: user.verified,
        token: token,
        _id: user._id
    }  
    res.json({ success: true, user: currentUser,message: "User Login successfully"}); 

  }catch(err){ 
    return res.status(400).json({success: false ,message:"Failed to Login user"}); 
  } 
};  
 
exports.verifyEmail = async (req , res ) => { 
   
  const {userId, otp} = req.body; 

  if (!userId || !otp?.trim()) {
    return  sendError(res,"Invalid request missing parameters") 
  } 
  try { 
    const user = await User.findById(userId)   
     
     const userInfo = {
      name: user.name,
      email: user.email,
      userId : user._id   
      };
    if(!isValidObjectId(userId)) return sendError(res,"Invalid user id!") 
    if(!user) return sendError(res,"Sorry, user not found!") 
    
    if(user.verified) return sendError(res,"This account is already verified") 

    const token = await VerificationToken.findOne({owner: user?._id})
    if(!token) return sendError(res,"Sorry, OTP Code not found!")
    const isMatch = await token.compareToken(otp);
    
    if(!isMatch){
      return sendError(res,'Please provide a valid OTP Code!') 
    }  
   

    await VerificationToken.findByIdAndDelete(token?._id);  

    if(isMatch){
      await User.findByIdAndUpdate({_id: userId},{ verified: true }); 
    } 

    const mailName = user?.name
    mailTransport().sendMail({
      from: 'emailverification@gmail.com',
      to: user.email,
      subject: "nandan email verification",
      html: generateEmailTamplateSuccess(mailName)
    })  

    return res.json({ success: true, message: "your email is verified.",userInfo: userInfo})
  
    } catch (err) {
      return res.status(400).json("Invalid"); 
    }
  
}   

exports.resendToken = async (req, res) => {
  const { userId } = req.body;

  try{  
    
    const oldOtp = await VerificationToken.findOne({owner: userId});
    if(oldOtp) return sendError(res,"Only after 1h you can request for another OTP Code!")

    const user = await User.findById(userId)  

    if(!user.verified){
    const OTP = generateOTP(); 
    const verificationToken = new 
    VerificationToken({
        owner: user._id,
        token: OTP
    }) 
    await verificationToken.save(); 
     
    const mailName = user?.name
    mailTransport().sendMail({
      from: 'emailverification@gmail.com',
      to: user.email,
      subject: "nandan email verification",
      html: generateEmailTamplate(mailName,OTP)
    })  
    return res.json({ success: true, message:"send your otp code your email"});
    }  
    return res.json({ success: false, message:"this email already verify"});
 
    }catch(err){
      return res.status(400).json("Invalid"); 
    }  
};

exports.forgotPassword = async (req, res) => {
   const {email} = req.body; 
   try{    
    const user = await User.findOne({email});
    if(!email) return sendError(res,"please provide a valid email!")  
    if(!user) return sendError(res,"User not found, invalid request!")  
    const token = await ResetToken.findOne({owner: user._id});
    if(token) return sendError(res,"Only after 1h you can request for another token!")
 
     const RandomBytes = await createRandomBytes();
     const resetToken = new ResetToken({owner: user._id, token: RandomBytes}) 
     await resetToken.save();
       
    const mailName = user?.name
    const mailUserId = user?._id
    mailTransport().sendMail({
     from: 'security@gmail.com',
     to: user.email,
     subject: "nandan password reset",
     html: generateEmailTamplateResetpassword(mailName,RandomBytes,mailUserId)  
    })   

    return res.json({ success: true, message:"Password reset link is sent to your email"});

   }catch(err){ 
    return res.status(400).json({success: false ,message:"Invalid"}); 
   }
   
}  

exports.resetPassword = async (req,res) => {
   const {password} = req.body;
   
   try{
    const user = await User.findById(req.user._id)  
    if(!user) return sendError(res,"user not found!")

    const isSamePassword = await user.comparePassword(password);
    if(isSamePassword) return sendError(res,"New Password Must be the different");
    if(password.trim().length < 8 || password.trim().length > 20)
    return sendError(res,"Password must be 8 to 20 characters long!");

    user.password = password.trim();
    await user.save()
     
    await ResetToken.findOneAndDelete({owner: user._id}); 
    
    const mailName = user?.name 
    mailTransport().sendMail({
     from: 'security@gmail.com',
     to: user.email,
     subject: "nandan password reset",
     html: generateEmailTamplateResetpasswordSuccess(mailName)  
    })  
    
   return res.json({ success: true, message:"password reset successfully"});
      
   }catch(err){ 
    return res.status(400).json({success: false ,message:"Invalid"}); 
   }
 
} 

exports.changePassword = async (req,res) => {
  const {oldPassword ,password,userId} = req.body;
 
    try{
      const user = await User.findById(userId)  
      if(!user) return sendError(res,"user not found!") 
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch)  return sendError(res,"Old Password Don't Match!"); 
      const isSamePassword = await user.comparePassword(password);
      if(isSamePassword) return sendError(res,"New Password Must be the different"); 
      if(password.trim().length < 8 || password.trim().length > 20)
      return sendError(res,"Password must be 8 to 20 characters long!"); 
      user.password = password.trim();
      await user.save();  
      return res.json({ success: true, message:"password change successfully"});
       
      }catch(err){ 
        return res.status(400).json({success: false ,message:"Invalid"}); 
      } 
}
 
exports.getAllUsers   = async(req, res)=> {
  try {
      const users = await User.find({})
      if (users.length > 0) {
          res.status(200).send(users)
      }
  }
  catch(err){
      return res.status(500).json({ message: 'Something went wrong' })
  }
}

exports.deleteUser = async(req, res)=> {
  const userid = req.body.userid
  try { 
      await User.findOneAndDelete({_id: userid})
      res.status(200).send("User deleted successfully")
  }
  catch(err){
      return res.status(500).json({ message: 'Something went wrong' })
  }
}

exports.updateProfile = async (req, res) => {
  const { name, email ,userId ,phone} = req.body; 
  try{ 
    const user = await User.findById(userId); 
    
    if(user?.email !== email){
      const isNewUser = await User.isThisEmailInUse(email);
      if (!isNewUser) return sendError({res,message:'This email is already in use, please try another email'});
    } 
      await User.findByIdAndUpdate({_id: userId},{name: name});  
      await User.findByIdAndUpdate({_id: userId},{email: email}); 
      await User.findByIdAndUpdate({_id: userId},{phone: phone}); 
 
    return res.json({ success: true ,message:"profile update successfully"}); 
  }catch(err){ 
    return res.status(400).json({success: false ,message:"Invalid"}); 
  }   
};
 
