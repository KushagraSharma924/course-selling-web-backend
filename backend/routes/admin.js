const express = require('express');
const adminMiddleware = require("../db/middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtpassword = '123456'
const secretKey = '1234589'
// Admin sign-in route
router.post('/signin', async function(req, res) {
    const { username, password } = req.body;

    await Admin.create({
        username,
        password
    });
    res.json({
        msg:'admin logged in'
    })
});

// Course creation route with admin middleware
router.post('/courses', adminMiddleware , async function(req, res) {
    username = req.headers.username
    password = req.headers.password
   
    try {
        const { title, description, image, Price } = req.body;

        // Validate input
        if (!title || !description || !image || !Price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new course
        const newCourse = await Course.create({
            title,
            description,
            image,
            Price
        });

        res.json({
            message: "Course Created",
            course: newCourse._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
   
});
router.get('/token',function(req,res){
    const {username, password} = req.headers
    const payload = { username, jwtpassword };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log(token)
    res.json({
        token:token
    });
})
module.exports = router;
