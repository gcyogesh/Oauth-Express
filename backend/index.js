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
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());






app.use(router)

app.listen(6005, () => {
    console.log("Server running on port 6005");
});
