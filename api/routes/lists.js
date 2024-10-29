const router = require("express").Router();
const List = require('../models/List');
const verify = require('../verifyToken');

// CREATE
router.post('/create', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(200).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

// UPDATE
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

// DELETE
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json('List has been deleted...');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});


// GET ALL
router.get('/', verify, async (req, res) => {
    try {
        const lists = await List.find();
        res.status(200).json(lists.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;