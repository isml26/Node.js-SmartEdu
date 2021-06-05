const bcrypt = require("bcrypt");
const Category = require('../models/Category');
const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
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
                        req.session.userID = user._id;
                        res.status(200).redirect('/users/dashboard');
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
exports.logoutUser = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
};
exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID});
    const categories = await Category.find();
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
    });
};