const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

router.get("/hello",async(req,res)=>{
    res.send("hello")
})
router.post("/data",async(req,res)=>{
    console.log(req)
    console.log(req.body)
})
module.exports = router;