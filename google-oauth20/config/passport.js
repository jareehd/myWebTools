const passport =require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys')
const User = require('../models/users-model')

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    }); 
})


passport.use(
    new GoogleStrategy({
        callbackURL :"/auth/google/redirect" ,
        clientID : keys.google.clientID ,
        clientSecret: keys.google.clientSecret
    }, (accessToken ,refreshToken ,profile ,done )=>{
        
        User.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is already register');
                done(null,currentUser);
            }
            else {
                console.log(profile);
                new User({
                    username:profile.displayName ,
                    googleID: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser)=>{
                    console.log('new user is created ', newUser)
                    done(null ,newUser)
                })   
                     
            }
        })     
 })
)