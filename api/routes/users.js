const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verify = require('../verifyToken');

//UPDATE
router.put('/:id', verify, async (req, res) => {

    if (req.user.id == req.params.id || req.userAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true });
            return res.status(200).json(updateUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
});

//DELETE

router.delete('/:id', verify, async (req, res) => {

    if (req.user.id == req.params.id || req.userAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted...");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json({ message: 'You can only delete your own account' });
    }
});

//FIND

router.get('find/:id', verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        return res.status(200).json(info);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//FIND ALL USERS

router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            const userResponses = users.map(user => {
                const userObj = user.toObject();
                const { password, ...info } = userObj;
                return info;
            });

            return res.status(200).json(userResponses);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to see all users!!!");
    }
});

//STATS

router.get('/stats', async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);


    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },

        ]);
        res.status(200).json(data);


    } catch (err) {
        res.status(500).json(err);

    }
});

module.exports = router;