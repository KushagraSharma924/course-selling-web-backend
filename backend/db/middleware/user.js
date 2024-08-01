//middleware for user auth
const router = require("../../routes/user.js");

const { User } = require("../index.js");



function UserMiddleware(req,res,next){

    const username = req.headers.username;
    const password = req.headers.password
    User.findOne({
        username: username,
        password: password
    })
    .then (function(value){
        if(value){
            next();
        }else{
            res.json({
                msg:"User Does'nt have exit"
            })
        }
    })
} 
module.exports = UserMiddleware;