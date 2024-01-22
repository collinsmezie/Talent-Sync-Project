const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: String,
       
    },
    updated: {
        type: String,
        default: null
    }
});


const Post = mongoose.model('talentsync-post', postSchema);

module.exports = Post;
