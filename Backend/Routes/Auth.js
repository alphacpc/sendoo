const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');


// REGISTER
router.post("/inscription", async(req, res)=>{
    const checkUserExist = await User.findOne({userName: req.body.username}) || await User.findOne({userEmail: req.body.email});

    checkUserExist && res.status(400).json({user: "email already exists" });
    

    try {
            const saltRounds = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, saltRounds);

            const newUser = await new User({
                userFname : req.body.firstname,
                userLname: req.body.lastname.toUpperCase(),
                userName : req.body.username,
                userEmail : req.body.email,
                userPw : hashedPass
            });

            const user = await newUser.save();

            console.log("Sauvegarde de:",user)
            res.status(200).json(user);

    }
    catch (err){
            console.log("Not Response from server !")
            res.sendStatus(500);
            console.log(err)
    }
    
});


// LOGIN
router.post("/connexion", async(req, res)=>{
    try{
        const user = await User.findOne({userName: req.body.identifiant}) || await User.findOne({userEmail: req.body.identifiant});
        !user && res.status(400).json("email or usename incorrect !");

        const validated = await bcrypt.compare(req.body.password, user.userPw);
        !validated && res.status(400).json("Password incorrect !");

        const { userPw , ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})




module.exports = router;