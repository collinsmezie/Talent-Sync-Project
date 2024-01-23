const express = require('express');
const postsRouter = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');


postsRouter.get('/posts', postController.getAllPosts);
postsRouter.get('/posts/:id', passport.authenticate('jwt', { session: false }), postController.getPostById);
postsRouter.post('/posts', passport.authenticate('jwt', { session: false }), postController.createPost);
postsRouter.put('/posts/:id', passport.authenticate('jwt', { session: false }), postController.updatePost);
postsRouter.delete('/posts/:id', passport.authenticate('jwt', { session: false }), postController.deletePost);




module.exports = postsRouter;