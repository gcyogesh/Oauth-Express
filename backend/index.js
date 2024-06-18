// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js'
import router from './routes/AuthRoute.js';

dotenv.config()
import Connection from './db/Connection.js';


const app = express();



// Connect to the database
Connection();

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: "12342345aa",
    resave: false,        // prevents unnecessary session updates,
    saveUninitialized: true, //Determine session should be saved in session store if it is new and modified
}));

app.use(passport.initialize());    // initialize passport authentication middleware
app.use(passport.session());     //  express session middlware allow passport to manage session 






app.use(router)

app.listen(6005, () => {
    console.log("Server running on port 6005");
});
