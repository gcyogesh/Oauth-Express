import passport from '../config/passport.js'

export const googleAuthHandler = passport.authenticate("google", { scope: ["profile", "email"] }); // Authenticate process initialize garna
//it redirect us to google authentication page of google  Scope parameter lay k permission request gareko xa bujauxxa

export const googleAuthCallbackHandler = passport.authenticate("google", {    // user authenticate vaysi callback handle garnay
    successRedirect: "http://localhost:5173/dashboard",        // Sucess vayesi janay thau
    failureRedirect: "http://localhost:5173/login"             //Sucess vayuna vani janay thau
})



export const facebookAuthHandler = passport.authenticate("facebook", { scope: ["email"] });  
//redirect to facebook authentication page ja bata hami lay facebook profile ko email pauxam.

export const facebookAuthCallbackHandler = passport.authenticate("facebook", {   // user authenticate veaysi callback handle garnay
    successRedirect: "http://localhost:5173/dashboard",   
    failureRedirect: "http://localhost:5173/login"
})



export const loginSuccessHandler = (req, res)=>{   // login handle garna
    if (req.user) {  //req.user lay authenticate xa kinai check garxa ani req.user lai passport lay user information sanga populate garxa 
        res.status(200).json({ msg: "User login success", user: req.user });
    } else {
        res.status(400).json({ msg: "Not authorized" });
    }
}


export const logoutHandler =(req, res, next) => {
    req.logout(function (err) {   // function provide by passporjs  
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:5173/"); // if err redirect to home page
    });
}