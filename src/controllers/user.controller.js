var User = require('../models/user.model');
var Crypto = require('crypto-js')

async function RegisterUser (req,res) {
    try {
        var hashedPassword = Crypto.AES.encrypt(req.body.password)
        req.body.password = hashedPassword;
        const response = await User.create(req.body)
    
        res.status(201).json({
            success: true,
            message: response
        })
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

async function LoginUser (req,res) {
    try {
        var user = User.findOne({email: req.body.email})
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const hashedPassword = Crypto.AES.decrypt(user.password, process.env.SECRET-KEY)
        const originalPassword = hashedPassword.toString(Crypto.enc.Utf8)

        if(originalPassword != req.body.password){
            return res.status(401).json({
                success:false,
                message:"Wrong username or password"
            })
        }

        const accessToken = jwt.sign({
            id:user._id,
        }, process.env.JWT_SECRET,{expiresIn:"2d"})

        const {password,...others} = user._doc
        res.status(200).json({
            success:true,
            data:{...others,accessToken}
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = { RegisterUser, LoginUser } 