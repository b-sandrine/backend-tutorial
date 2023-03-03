var User = require('../models/user.model');
var Crypto = require('crypto-js')
var jwt = require('jsonwebtoken');

exports.RegisterUser = async (req,res) => {
    try {
        var hashedPassword = Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC_KEY)
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

exports.LoginUser = async (req,res) => {
    try {
        var user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        const hashedPassword = Crypto.AES.decrypt(user.password, process.env.SECRET_KEY )
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

exports.FindAllUser = async(req,res) => {
    try {
        const users = await User.find()
        if(!users) {
            return res.status(400).json({
                success: false,
                data: "Records Not FOund"
            })
        }

        res.status(200).json({
            success: true,
            data: users
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message 
        })
    }
}

exports.UpdateUser = async(req,res) => {
    try {
        const id = req.params.id;
        console.log(id);

        if(req.body.password) {
            var hashedPassword = Crypto.AES.encrypt(req.body.password,process.env.PASS_SEC_KEY).toString();
        }
 
        req.body.password = hashedPassword;
        // console.log(req.body) 
        var user = await User.findByIdAndUpdate({_id: id}, req.body, { new: true,upsert: true })

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })
    }
    catch(err) {
        console.log("I am here")
        res.status(500).json({
            success: false,
            data: err.message
        })
    }
}

exports.DeleteUser = async(req,res) => {
    try {
        console.log(req.params.id)
        var user = await User.findByIdAndDelete(req.params.id);
            if(!user) {
                return res.status(400).json({
                success: false,
                data: "Failed to delete user"
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            data: err.message
        })
    }
}