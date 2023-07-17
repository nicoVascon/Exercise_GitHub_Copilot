// Create web server
// Author: Minh Tran Quoc

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../config/auth');

// @route   GET /comments/:id
// @desc    Get all comments of a post
// @access  Public
router.get('/:id', (req, res) => {
    Comment.find({ post: req.params.id })
        .populate('user', 'name')
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}
);

// @route   POST /comments/:id
// @desc    Create a comment
// @access  Private
router.post('/:id', ensureAuthenticated, [
    check('content', 'Content is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    const comment = new Comment({
        user: req.user.id,
        post: req.params.id,
        content: req.body.content
    });
    comment.save()
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}
);

// @route   PUT /comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', ensureAuthenticated, (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            comment.content = req.body.content;
            comment.save()
                .then(comment => {
                    res.json(comment);
                })
                .catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}
);
