const express = require('express');
const UserMiddleware = require("../db/middleware/user.js");
const {  User, Course } = require("../db/index.js");
const router = express.Router();
const mongoose = require('mongoose')

router.post('/signin', async function(req, res) {
    const { username, password } = req.body;

    await User.create({
        username,
        password
    });

    res.json({
        message: 'user Created Successfully'
    });
});


router.get('/courses' , async function(req, res) {
    const response = await Course.find({
    });
    

res.json({
    courses:response
})
});
router.post('/courses/:courseId',UserMiddleware,async function(req,res){
    const courseId = req.params.courseId;
     const username = req.headers.username
   try{ await User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses : courseId
        }
      })
      res.json({
        message:'Purshase Completed'
      })}
    catch{
        throw new Error
    }  
});
router.get('/purchasedCourses',async function(req,res){

    const user  = await User.findOne({
        username: req.headers.username
    })
    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id:{
            "$in" :user.purchasedCourses
        }
    })
    res.json({
        msg: courses
    })
})

module.exports = router