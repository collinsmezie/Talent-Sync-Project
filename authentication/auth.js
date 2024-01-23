const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users');
require('dotenv').config();



passport.use(
    new JWTstrategy (
        {
        secretOrKey: process.env.JWT_SECRET,
        // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);



  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // Check if email is missing
          if (!email) {
            return done(null, false, { message: 'Email is required' });
          }
  
          // Check if password is missing
          if (!password) {
            return done(null, false, { message: 'Password is required' });
          }
  
          const user = await UserModel.findOne({ email });
  
          // Check if user is not found
          if (!user) {
            return done(null, false, { message: 'You dont have an account yet - Please Signup' });
          }
  
          const validate = await user.isValidPassword(password);
  
          // Check if password is incorrect
          if (!validate) {
            return done(null, false, { message: 'Incorrect Password, Try Again' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  




passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.create({ email, password });
                return done(null, user);
            } catch (error) {
                if (error.code === 11000) {
                    return done(null, false, { message: 'Email already taken' });
                }
                //missing fields
                if (error.name === 'ValidationError') {
                    return done(null, false, { message: 'Missing credentials' });
                }
                return done(error);
            }
        }
    )
);


