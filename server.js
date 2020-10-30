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

const { PORT, MONGO_URI, CLIENT_ORIGIN } = require('./configs/prodConfig');
const { SESSION_OPTIONS, IN_PROD } = require('./configs')

const app = express();
app.use(cors({
    origin: CLIENT_ORIGIN
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

/* Passport config */
require('./configs/passport')(passport);

/* Mongodb connection */
const database = MONGO_URI;
mongoose.connect(database, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB cluster...')
})
.catch(err => {
    // handle failed database connection, but for now console.log error
    console.log(err);
});

/* Session storage & persisting session data */
const MongoStore = connectMongo(session);

app.use(session({
    ...SESSION_OPTIONS,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


/* Passport js middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Server routes */
app.use('/api/users', require('./routes/api/users'));
app.use('/api/jobs', require('./routes/api/jobs'));


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.enable('trust proxy');

    // Catch all to handle all other requests that come into the app. 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



const server = app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
});