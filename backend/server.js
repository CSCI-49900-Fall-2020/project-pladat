const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config();
const passport = require('passport');
const cors = require('cors');
const socket = require('socket.io');
const events = require('events');
const connectMongo = require('connect-mongo');



const app = express();
app.use(cors({
    origin: 'localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

/* Passport config */
//require('./configs/passport')(passport);

/* Mongodb connection */
const database = 'CONFIG URI GOES HERE';
mongoose.connect(database, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    // call some auth event here
})
.catch(err => {
    // handle failed database connection, but for now console.log error
    console.log(err);
});

/* Session storage & persisting session data */
/*
const MongoStore = connectMongo(session);
app.use(session({
    options: 'Some session configs go here',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
*/

/* Passport js initialisation */
app.use(passport.initialize());
app.use(passport.session());

/* Server routes */
