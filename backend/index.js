import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
import cors from 'cors';
import Connection from './db/Connection.js';
Connection();
import UserModel from './models/UserSchema.js';


// passport things 
import session from 'express-session';
import passport from 'passport';
import googlePassport from 'passport-google-oauth2';
const oAuthStrategy = googlePassport.Strategy;


const clientId = process.env.clientID
const clientSecret = process.env.clientSecret


app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE",
    credentials:true
    }))
    
    app.use(express.json());

    // setup the session 
    app.use(session({
        secret:"12342345aa",
        resave:false,
        saveUninitialized:true,
    }))

    // setup passport 
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new oAuthStrategy({
            clientID:clientId,
            clientSecret:clientSecret,
            callbackURL:"/auth/google/callback",
            scope:["profile", "email"]
        }, 
        async(accessToken, refreshToken, profile, done)=>{       // Done is callBack function 
            console.log(profile)
            try {
                let user = await UserModel.findOne({googleId:profile.id});
                if(!user){
                    user = new  UserModel({
                        googleId: profile.id,
                        displayName:profile.displayName,
                        email:profile.emails[0].value,     // 0th position of email
                        image:profile.photos[0].value
                    })

                    await user.save();

                }
                return done(null, user)

            } catch (error) {
               return done(error, null)
            }
        }
    )
    )
    
  passport.serializeUser((user, done)=>{
    done(null, user)
  })
                                                        // These two are for Session things if not it will give error 
  passport.deserializeUser((user, done)=>{
    done(null, user)
  })


  // initial google auth login 
  app.get("/auth/google", passport.authenticate("google", {scope:["profile", "email"]}));

  app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect:"http://localhost:5173/dashboard",
    failureRedirect:"http://localhost:5173/login"
  }))

  app.get("/login/success", async(req, res)=>{
    if(req.user){
      res.status(200).json({msg:"User login sucess", user:req.user})
    }else{
      res.status(400).json({msg:"Not authorized"})
    }
  })

  app.get("/logout", (req, res, next)=>{
    req.logout(function(err){
      if(err){
        return next(err)
        }
        res.redirect("http://localhost:5173/");
    });

  })


        
app.listen(6005, ()=>{
    console.log(("Server runnnign"))
})