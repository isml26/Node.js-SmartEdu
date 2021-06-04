const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'failed',
            error
        })
    }
}