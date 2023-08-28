const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler( async(req, res) => 
{
    const {username , email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory");
    }

    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("This Email is in already use");
    }
    
    //Since we should not store raw password in our Database, So, we hash password
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);     //10 is the number of solved password(no.of times it hashed ig)
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword,
        }
    );
    // console.log(`User created ${user}`);
    // res.status(201).json(user);
    if(user)
    {
        res.status(201).json({ _id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User Data is not valid");
    }
}
);

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are mendatory");
    }
    const user = await User.findOne({email});

    //compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))){
        //Didn't chose the whole fetched user as don't want to embed password
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    }
    else
    {
        res.status(401);
        throw new Error("Username or Password not Correct");
    }
    
});

//@desc Current User Information
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler( async(req, res) => {
    res.json(req.user);
});



module.exports = {registerUser, loginUser, currentUser};