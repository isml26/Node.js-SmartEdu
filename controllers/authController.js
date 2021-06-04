const User = require("../models/User");
const bcrypt = require("bcrypt");
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
};
exports.loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        await User.findOne({email},(err,user)=>{
            if(user){
                bcrypt.compare(password,user.password,(err,same)=>{
                    if(same){
                        //USER SESSION
                        res.status(200).send('You are logged in');
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'failed',
            error
        })
    }
};