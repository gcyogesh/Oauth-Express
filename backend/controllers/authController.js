import passport from '../config/passport.js'

export const googleAuthHandler = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleAuthCallbackHandler = passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login"
})



export const facebookAuthHandler = passport.authenticate("facebook", { scope: ["email"] });

export const facebookAuthCallbackHandler = passport.authenticate("facebook", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login"
})


export const loginSuccessHandler = (req, res)=>{
    if (req.user) {
        res.status(200).json({ msg: "User login success", user: req.user });
    } else {
        res.status(400).json({ msg: "Not authorized" });
    }
}


export const logoutHandler =(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:5173/");
    });
}