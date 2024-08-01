const express = require('express');
const adminMiddleware = require("../db/middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = express.Router();

// Admin sign-in route
router.post('/signin', async function(req, res) {
    const { username, password } = req.body;

    await Admin.create({
        username,
        password
    });

    res.json({
        message: 'Admin Created Successfully'
    });
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

module.exports = router;
