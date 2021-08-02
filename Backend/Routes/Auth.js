const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');
// REGISTER
router.post("/inscription", async(req, res)=>{
    try {

        const saltRounds = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds)

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err){
        res.status(500).json(err)
    }
});


// LOGIN
router.post("/connexion", async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username}) || await User.findOne({email: req.body.email});
        !user && res.status(400).json("email or usename incorrect !");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Password incorrect !");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})




module.exports = router;