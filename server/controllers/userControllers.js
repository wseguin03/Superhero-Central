const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        username,
        email,
        password
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        });
}else{
    res.status(400);
    throw new Error('Invalid user data');
}

});


const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    // console.log(req.body);
    const user = await User.findOne({email});
    console.log(user);
    if((user) && (await user.matchPasswords(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
});
    
module.exports = {registerUser, authUser};