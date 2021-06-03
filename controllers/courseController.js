const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    try {
    const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            course
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'failed',
            error
        })
    }
};
exports.getAllCourses = async (req, res) => {
    try {
    const courses = await Course.find();
        res.status(200).render('courses',{
            courses,
            page_name:"courses"
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'failed',
            error
        })
    }
};