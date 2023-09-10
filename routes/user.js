const express = require('express');
const router = express.Router();
 
 
const {
    createUser,
    userSignIn,
    verifyEmail,
    resendToken,
    forgotPassword,
    resetPassword,
    changePassword,
    getAllUsers,
    deleteUser, 
    updateProfile 
  } = require('../controllers/user');

  const {
    validateUserSignUp,
    validate,
    validateUserSignIn,
    isResetTokenValid
  } = require('../middlewares/validation/user');

  
router.post('/register', validateUserSignUp,validate, createUser); 
router.post('/login',validateUserSignIn, validate, userSignIn);
router.post('/emailverify', verifyEmail);
router.post('/resendtoken', resendToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',isResetTokenValid,validate ,resetPassword);
router.post('/change-password', changePassword);
router.get('/getallusers', getAllUsers);
router.post('/deleteuser', deleteUser);
router.post('/update-profile' ,updateProfile);
 
// router.post('/sign-out', isAuth, signOut);
// router.post('/upload-profile',isAuth,uploads.single('profile'),uploadProfile);


module.exports = router;
