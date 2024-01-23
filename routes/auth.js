const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();


authRouter.post('/signup', (req, res, next) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        // Custom handling for duplicate key error
        if (info && info.message === 'Email already taken') {
          return res.status(400).json({ Message: 'This Email is already registered' });
        }
        // handle misssing fields error
        if (info && info.message === 'Missing credentials') {
          return res.status(400).json({ Message: 'Missing credentials or password is too short' });
        }
  
        // Handle other errors as needed
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // If authentication succeeds, you can handle it here
      res.json({
        message: 'Signup successful, You can now login with your credentials',
        user: req.user
      });
    })(req, res, next);
  });
  



authRouter.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          // Handle missing email or password
          if (info && info.message) {
            return res.status(400).json({ error: info.message });
          }
          const error = new Error('An error occurred.');
          return next(error);
        }
  
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
  
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

          // Send back the token and success message
            return res.json({ message: 'Login successful', token });

        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  


module.exports = authRouter;

