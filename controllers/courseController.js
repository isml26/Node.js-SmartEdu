const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    const course = await Course.create(req.body);
    try {
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
}