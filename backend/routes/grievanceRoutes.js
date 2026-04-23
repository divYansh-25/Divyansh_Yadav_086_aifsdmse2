const router = require("express").Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

router.post("/", auth, async(req,res)=>{
    const grievance = await Grievance.create({
        ...req.body,
        studentId:req.user.id
    });

    res.json(grievance);
});

router.get("/", auth, async(req,res)=>{
    const data = await Grievance.find({
        studentId:req.user.id
    });

    res.json(data);
});

router.get("/search", auth, async(req,res)=>{
    const data = await Grievance.find({
        title:{
            $regex:req.query.title,
            $options:"i"
        },
        studentId:req.user.id
    });

    res.json(data);
});

router.get("/:id", auth, async(req,res)=>{
    const item = await Grievance.findById(req.params.id);
    res.json(item);
});

router.put("/:id", auth, async(req,res)=>{
    const updated = await Grievance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(updated);
});

router.delete("/:id", auth, async(req,res)=>{
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({msg:"Deleted"});
});

module.exports = router;