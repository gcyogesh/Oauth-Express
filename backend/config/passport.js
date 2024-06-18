import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import UserModel from '../models/UserSchema.js';
import dotenv from 'dotenv';

dotenv.config();



const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const facebookAppId = process.env.FACEBOOK_APP_ID;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;


passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
            user = new UserModel({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));



passport.use(new FacebookStrategy({
    clientID: facebookAppId,
    clientSecret: facebookAppSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({ facebookId: profile.id });
        if (!user) {
            user = new UserModel({
                facebookId: profile.id,
                displayName: profile.displayName,
                email: (profile.emails && profile.emails[0].value) || '',
                image: (profile.photos && profile.photos[0].value) || ''
            });
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));




passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;