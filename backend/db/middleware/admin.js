// Middleware for admin auth
const router = require("../../routes/admin.js");
const { Admin } = require("../index.js");


function adminMiddleware(req,res,next){

    const username = req.headers.username;
    const password = req.headers.password
   
    Admin.findOne({
        username: username,
        password: password
    })
    .then (function(value){
        if(value){
            next();
        }else{
            res.json({
                message:"User Does'nt have Access"
            })
        
    }
})
.catch(function(error) {
    res.status(500).json({ msg: "Internal Server Error" });
});
}
module.exports = adminMiddleware;
