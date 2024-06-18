import passport from 'passport';    // Nodejs middleware for authentication 
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';  //  Google Oauth2 implement garna passporjs lay deko strategy
import { Strategy as FacebookStrategy } from 'passport-facebook';  // Facebook Oauth2 implement garna passporjs lay deko strategy
import UserModel from '../models/UserSchema.js';
import dotenv from 'dotenv';

dotenv.config();



const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const facebookAppId = process.env.FACEBOOK_APP_ID;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;


passport.use(new GoogleStrategy({
    clientID: googleClientId,            // google deverloper console bata painxa
    clientSecret: googleClientSecret,    // same 
    callbackURL: "/auth/google/callback",   // Hamro application authorize garesi user lai redirect garxa google lay
    scope: ["profile", "email"]   // K k access chaixa like profile, email.
}, async (accessToken, refreshToken, profile, done) => {                  
    // some of basic information 
    // 1. AccessToken  = Token used to access google api
    // 2. refreshToken = Naya accessToken pauna when purano access token expied
    // 3.Profile = User ko google info (id, image, displayName)
    // 4. Done = Done is callback function to let know sucess or failure while authentication. 
    try {
        let user = await UserModel.findOne({ googleId: profile.id });  // Google ko id herera DB bata find garnay
        if (!user) {
            user = new UserModel({         // Yedi DB ma xaina vanay it will create and store in our database   
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,     // Google ma image haru array ma hunxa so first index ko image nikalna
                image: profile.photos[0].value
            });
            await user.save();
        }
        return done(null, user);    // Session ma store garna lai user object pass garnay 
    } catch (error) {
        return done(error, null);
    }
}));




passport.use(new FacebookStrategy({            // same thing as google
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



//  Serialize ra deserialize chai Session ko lagi use hunxa 

passport.serializeUser((user, done) => {   // After sucessfully  login user id session ma serilized hunxa.
    //  This allow passport to store user id in  session cookie.
    done(null, user);
});

passport.deserializeUser((user, done) => {      
    done(null, user);
});
// When a user logs in, Passport saves their ID in the session. For each new request from that user, Passport uses this ID to fetch their full user details from the database. This information is then attached to the req object as req.user, allowing easy access to the user's data throughout the request handling.

export default passport;