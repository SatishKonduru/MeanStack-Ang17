const express = require('express')
const connection = require('../connection')
const router =  express.Router()
const { User } = require('../models/userModel')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('../AuthServices/authorization')
const { checkRole } = require('../AuthServices/checkRole')
const multer = require('multer')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('dotenv').config()




//multer configuration
const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid Image Type')
        if(isValid){
            uploadError = null
        }
      cb(uploadError , 'public/uploads')
    },
    filename: function (req, file, cb) { 
       //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = file.originalname.split(' ').join('-')
      const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  const uploadOptions = multer({ storage: storage })

//getting All users
router.get('/getUsers', authenticateToken, checkRole, async (req, res) => {
    const usersList = await User.find().select('-password')
    if(usersList.length <= 0){
        res.status(500).send({
            message: 'No Users were found.'
        })
    }
    else{
        res.status(200).send({
            users: usersList
        })
    }
})

//Register new User
router.post('/register', async (req, res) => {
    const userData = req.body
     // Check if the email already exists
     const existingUser = await User.findOne({ email: userData.email });
     if (existingUser) {
         return res.status(400).send({
             message: 'Email already exists. Please use a different email address.'
         });
     }
     // Create a new user
    newUser = new User({
        name: userData.name,
        email: userData.email,
        password: bcrypt.hashSync(userData.password,10),
        phone: userData.phone,
        city: userData.city,
        country: userData.country
       
    })

    registeredUser= await newUser.save()
    if(!registeredUser){
        res.status(500).send({
            message: 'Internal Server Error, Registration Failed.'
        })
    }
    else{
        res.status(200).send({
            message: "User Registered Successfully",
            newUser: registeredUser
        })
    }
})

//Getting user by Id
router.get('/getById/:id',authenticateToken, async (req, res) => {
    const id = req.params.id
    if(!mongoose.isValidObjectId(id)){
        return res.status(401).send({message: 'Invalid User Id'})
    }
    userDetails = await User.findById(id)
    if(userDetails.length <= 0){
        return res.status(500).send({
            message: 'Internal Server Error. Please try later'
        })
    }
    else{
        return res.status(200).send({
            message: 'User Found.',
            userDetails: userDetails
        })
    }
})

router.post('/login', async (req, res) => {
    const user = req.body
    const existingUser = await User.findOne({email: user.email})
    if(!existingUser){
        return res.status(400).send({
            message: 'Invalid Email id'
        })
    }
    if(existingUser && bcrypt.compareSync(user.password, existingUser.password)){
        const payload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        }
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'})
        return res.status(200).send({
            token: accessToken
        })
    }
    else{
        return res.status(400).send({
            message: 'Wrong Password.'
        })
    }
    

})

router.patch('/update/:id', uploadOptions.single('image') ,authenticateToken, async (req, res) => {
    const userId= req.params.id
    const newData = req.body
    if(!mongoose.isValidObjectId(userId)){
        return res.status(500).send({
            message: 'Invalid Object Id'
        })
    }
    const file = req.file
    let imagePath;
    if(file){
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/` 
        imagePath = `${basePath}${fileName}`
    }
    // else{
    //     imagePath = product.image
    // }
    updateUser = await User.findByIdAndUpdate(userId, {
        name: newData.name,
        email: newData.email,
        phone: newData.phone,
        apartment: newData.apartment,
        street: newData.street,
        city: newData.city,
        state: newData.state,
        country: newData.country,
        image: imagePath
       },
        {new: true}
        )
    if(!updateUser){
       return res.status(500).send({
            message: "Invalid User Selection"
        })
    }
    else{
       return res.status(200).send({
            message: 'User Updated Successfully',
            newData: updateUser
        })
    }

})

router.post('/reset-password',  async (req, res) => {
    const email = req.body.email
   
    try {
        // Find user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        // Generate reset token
        const token = crypto.randomBytes(64).toString('hex')
         
        // Associate token with user's email (save token to user document)
        user.resetToken = token;
        await user.save();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Link',
        text: `Click the following link to reset your password: http://localhost:4200/reset-password/${token}`
      };
      transporter.sendMail(mailOptions);
      res.status(200).send({
        message: "Password Sent to your email"
      });
      
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
  
})

router.post('/update-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Find user by reset token
      const user = await User.findOne({ resetToken: token });
  
      if (!user) {
        return res.status(404).send({ message: 'Invalid or expired token' });
      }
       // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    return res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
   return res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router