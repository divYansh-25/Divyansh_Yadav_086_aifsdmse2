const router = require("express").Router();
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async(req,res)=>{
    const {name,email,password}=req.body;

    const exist = await Student.findOne({email});
    if(exist) return res.status(400).json({msg:"Email exists"});

    const hash = await bcrypt.hash(password,10);

    await Student.create({
        name,
        email,
        password:hash
    });

    res.json({msg:"Registered"});
});

router.post("/login", async(req,res)=>{
    const {email,password}=req.body;

    const user = await Student.findOne({email});
    if(!user) return res.status(400).json({msg:"Invalid Email"});

    const match = await bcrypt.compare(password,user.password);

    if(!match) return res.status(400).json({msg:"Wrong Password"});

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET
    );

    res.json({token});
});

module.exports = router;