const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// Register
router.post('/register', async (req, res) => {
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePic: req.body.profilePic,
            isAdmin: true
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.error('Error:', err); // Debugging log
        res.status(500).json("Internal Server Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(404).json({ message: "Incorrect Password" });

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );
        const { password, ...info } = user._doc;

        // Combine both info and accessToken into a single object
        return res.status(200).json({ ...info, accessToken });
    } catch (err) {
        console.error('Error:', err); // Debugging log
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
