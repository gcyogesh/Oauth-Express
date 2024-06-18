import express from 'express'
import { googleAuthCallbackHandler, googleAuthHandler, facebookAuthCallbackHandler, facebookAuthHandler, loginSuccessHandler, logoutHandler } from '../controllers/authController.js'

const router = express.Router();
// This routes are standard routers used by Oauth2 providers like google and facebook 

router.get("/auth/google", googleAuthHandler);

router.get("/auth/google/callback",  googleAuthCallbackHandler);


router.get("/auth/facebook", facebookAuthHandler );

router.get("/auth/facebook/callback", facebookAuthCallbackHandler );

router.get("/login/success", loginSuccessHandler);

router.get("/logout", logoutHandler );


export default router;



// if i want to add discord authrouter will be /auth/discord and callback route will be /auth/discord/callback