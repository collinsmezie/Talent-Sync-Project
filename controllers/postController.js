const { get } = require('mongoose');
const Post = require('../models/post');
const moment = require('moment');



// Get all Posts 
async function getAllPosts(req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a Post by id 
async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'No Post with that ID was found' });
        }
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Create a Post 
async function createPost(req, res) {
    try {
        const { title, author, content, created, updated } = req.body;
        const currentDate = created || moment().format('DD-MM-YYYY HH:mm:ss');

        const post = new Post({
            title,
            author,
            content,
            created: currentDate,
            updated: null
        });
        if (!post) {
            return res.status(400).json({ error: 'Bad request: check post format' });
        }
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a Post 
async function updatePost(req, res) {
    try {
        // const currentTime = moment().format('DD-MM-YYYY HH:mm:ss');
        const { title, author, content, updated } = req.body;
        const currentDate = updated || moment().format('DD-MM-YYYY HH:mm:ss');

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                author,
                content,
                updated: currentDate
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ error: 'No Post with that ID was found' });
        }
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a Post 
async function deletePost(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found, as it may have already been deleted' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};


