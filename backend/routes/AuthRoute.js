import express from 'express'
import { googleAuthCallbackHandler, googleAuthHandler, facebookAuthCallbackHandler, facebookAuthHandler, loginSuccessHandler, logoutHandler } from '../controllers/authController.js'

const router = express.Router();


router.get("/auth/google", googleAuthHandler);

router.get("/auth/google/callback",  googleAuthCallbackHandler);

// Facebook auth routes
router.get("/auth/facebook", facebookAuthHandler );

router.get("/auth/facebook/callback", facebookAuthCallbackHandler );

router.get("/login/success", loginSuccessHandler);

router.get("/logout", logoutHandler );


export default router;