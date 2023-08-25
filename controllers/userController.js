const asyncHandler = require("express-async-handler");

//@desc Register User
//@route GET /api/users/register
//@access public
const registerUser = asyncHandler( async(req, res) => {
        res.json({message: "Register the user"});
    }
);

//@desc Login User
//@route GET /api/users/login
//@access public
const loginUser = asyncHandler( async(req, res) => {
    res.json({message: "Login User"});
});

//@desc Current User Information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler( async(req, res) => {
    res.json({message: "Current User Info"});
});



module.exports = {registerUser, loginUser, currentUser};