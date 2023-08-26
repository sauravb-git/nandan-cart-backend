const { check, validationResult } = require('express-validator');
const User = require('../../models/userModel');  
const ResetToken = require('../../models/resetToken');
const { isValidObjectId } = require('mongoose'); 
const { sendError ,createRandomBytes } = require('../../utils/helper');


exports.validateUserSignUp = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required!')
    .isString()
    .withMessage('Must be a valid name! &')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be within 3 to 20 character!'),
  check('email').normalizeEmail().isEmail().withMessage('Your email is invalid!'),
  check('phone')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Phone is empty! &')
    .isLength({ min: 11, max: 11 })
    .withMessage('Phone number must be 11 character!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is empty! &')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 8 to 20 characters long!'),
  check('confirmpassword')
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Both password must be same!');
      }
      return true;
    }),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};
 
exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email / password is required!'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email / password is required!'),
];
  
  
exports.isResetTokenValid = async (req, res, next) => {
   const {token, id} = req.query;
   
   if (!token || !id) {
    return  sendError(res,"Invalid request missing parameters") 
  } 
  if(!isValidObjectId(id)) return sendError(res,"Invalid user id!")

  const user = await User.findById(id)   
  if(!user) return sendError(res,"Sorry, user not found!") 
   
  const resetToken = await ResetToken.findOne({owner: user._id}); 
  if(!resetToken) return sendError(res,"Sorry, Reset token not found!")
  
  const isValid = await resetToken.compareToken(token); 
  if(!isValid){
    return sendError(res,'Reset token is not invalid!') 
  }   
  req.user = user

  next(); 
}