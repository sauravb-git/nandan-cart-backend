// const User = require("../models/userModel")
// const express = require('express')
// const router = express.Router()

// router.post('/register', async (req, res) => {

//     const { name, email, password } = req.body

//     const newUser = new User({ name, email, password })

//     try {
//         await newUser.save()
//         res.status(200).send('User successfully register')
//     }
//     catch (err) {
//         return res.status(400).json({ message: err })
//     }
// })

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body

//     try {
//         const user = await User.find({ email, password })

//         if (user.length > 0) {
//             const currentUser = {
//                 name: user[0].name,
//                 email: user[0].email,
//                 isAdmin: user[0].isAdmin,
//                 _id: user[0]._id
//             }
//             res.status(200).send(currentUser)
//         }
//         else {
//             return res.status(400).json({ message: 'User login failed' })
//         }
//     }
//     catch (err) {
//         return res.status(500).json({ message: 'Something went wrong' })
//     }
// })

// router.get('/getallusers', async(req, res)=> {
//     try {
//         const users = await User.find({})
//         if (users.length > 0) {
//             res.status(200).send(users)
//         }
//     }
//     catch(err){
//         return res.status(500).json({ message: 'Something went wrong' })
//     }
// })

// router.post('/deleteuser', async(req, res)=> {
//     const userid = req.body.userid
//     try {
//         await User.findOneAndDelete({_id: userid})
//         res.status(200).send("User deleted successfully")
//     }
//     catch(err){
//         return res.status(500).json({ message: 'Something went wrong' })
//     }
// })




// module.exports = router