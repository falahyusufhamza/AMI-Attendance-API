const User = require("../database/models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { path } = require("..");

const BCRYPT_SALT = 10;

exports.createUser = async (req, res, next) => {
    const requestBody = req.body;
    const {name, email, whatsappNo, role, userName, password} = requestBody;
    const existingUser = await User.findOne({
        where: {
            userName,
        }
    });

    if (!!existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        })
    }
    const encryptedPassword = await bycrypt.hash(password, BCRYPT_SALT);
    const newUser = {
        name,
        email,
        whatsappNo,
        role,
        userName,
        password: encryptedPassword,
    };

    User.create(newUser).then(() => {
        return res.json({
            success: true,
            message: "Successfully created a new user"
        })
    }, () => {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    });
}

exports.signIn = async (req, res, next) => {
    const requestBody = req.body;
    const {userName, password} = requestBody;
    try {
        const user = await User.findOne({
            where: {
                userName,
            }
        });        
        if (!!user) {
            bycrypt.compare(password, user.dataValues.password)
            .then((success) => {
                if (!!success) {
                    const token = jwt.sign({
                        userId: user.dataValues.userId,
                        userName: user.dataValues.userName,
                        name: user.dataValues.name,
                        email: user.dataValues.email,
                        role: user.dataValues.role,
                    }, process.env.JWT_SIGNER);
                    res.cookie('authToken', token, {
                        httpOnly: true,         // recommended for security
                        secure: true,          // required for localhost (true only with HTTPS)
                        sameSite: 'None', // helps prevent CSRF attacks 
                          
                        // maxAge: 24 * 60 * 60 * 1000,
                    });
                    return res.status(200).json({
                        success: true,
                        token,
                        userId: user.dataValues.userId,
                        name: user.dataValues.name,
                        message: "Successfully logged in",
                    })
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Password is incorrect"
                    }) 
                }
            }, (error) => {
                console.log(error);
            throw new Error("Something went wrong") 
            })
            return;
        }
        return res.status(401).json({
            success: false,
            message: "Invalid user name",
        })
    } catch (error) {
        console.log("Unkown error" ,error);
        return res.status(500).json({
            success: false,
            errorDetails: error,
            message: "Something went wrong",
        })
    }
    
}

exports.signout = async (req, res, next) => {
    try {
        res.clearCookie("authToken");
        
        return res.json({
            message: "Signed out successfully",
            success: true,
        }) 
    } catch (error) {
        console.log(error);
        
        return res.json({
            message: "Failed to signout",
            success: false,
        })
    }

}