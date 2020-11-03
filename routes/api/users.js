const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');

const User = require('../../models/User');
const Student = require('../../models/Student');
const Employer = require('../../models/Employer');
const Recruiter = require('../../models/Recruiter');

const { JWT_EMAIL_VERIFY_SIGN_KEY, JWT_EMAIL_VERIFY_SIGN_OPTIONS, SENDGRID_APIKEY, CLIENT_ORIGIN, PROJECT_EMAIL } = require('../../configs/prodConfig');
const { forwardAuthentication, ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');
const { configureEmailVerification } = require('../../configs/EmailTemplate');
const { dateInFuture2 } = require('../../configs/DateFunctions');


function verifyToken(req, res, next) {
<<<<<<< HEAD
    // req.token = req.query.token;
=======
>>>>>>> master
    req.token = req.params.token;
    if(!req.token || typeof req.token === 'undefined' || typeof req.token === null) {
        return res.status(403).json({success: false, msg: "Invalid email verification link, or your link has expired."});
    }
    next();
}

function checkValidEmailFormat(email) {
    const regex = /^([a-zA-Z0-9]+[a-zA-Z0-9.!#$%&'*+\-\/=?^_`{|}~]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/g;
    let emailpass = regex.test(email);
    return emailpass;
}


router.post('/register', (req, res) => {
    const { firstname, lastname, email, pass, passConf, userType } = req.body;
    let isvalidemail = checkValidEmailFormat(email);

    if(!firstname || !lastname || !email || !pass || !passConf || !userType) {
        return res.status(422).json({success: false, msg: 'Please enter all fields.', errors: 'Please enter all fields.'});
    }
    else if(firstname.length < 1 || lastname.length < 1 || email.length < 1 || pass.length < 1 || passConf.length < 1|| userType.length < 1) {
        return res.status(422).json({success: false, msg: 'Please enter all fields.', errors: 'Please enter all fields.'});
    }
    else if(!isvalidemail) {
        return res.status(422).json({success: false, msg: 'Please enter a valid email address.', errors: 'Please enter a valid email address.'});
    }
    else if(pass.length < 8) {
        return res.status(422).json({success: false, msg: 'Passwords should be at least 8 characters, and a mix of letters, numbers, and symbols', errors: 'Passwords should be at least 8 characters, and a mix of letters, numbers, and symbols'});
    }
    else if(pass !== passConf) {
        return res.status(422).json({success: false, msg: 'Passwords must match.', errors: 'Passwords must match.'});
    }
    else if(userType !== "Student" && userType !== "Recruiter" && userType !== "Employer") {
        return res.status(422).json({success: false, msg: 'Invalid user type.', errors: 'Invalid user type.'});
    }
    else {
        User.findOne({ email: email})
        .then((user) => {
            if(user) {
                return res.status(422).json({success: false, msg: 'This emailed is already registered to a user.', errors: 'This emailed is already registered to a user.'});
            }
            else {
                const newUser = new User({
                    firstname,
                    lastname,
                    email,
                    password: pass,
                    typeOfUser: userType
                });

                jwt.sign({newUser}, JWT_EMAIL_VERIFY_SIGN_KEY, JWT_EMAIL_VERIFY_SIGN_OPTIONS, (err, token) => {
                    if(err) {
                        return res.status(500).json({success: false, msg: 'Due to server issues, we cannot register you at the moment', err});
                    }
                    else {
                        sgMail.setApiKey(SENDGRID_APIKEY);

                        const returnLink = `${CLIENT_ORIGIN}/complete-registeration/email-verification/${token}`;

                        const htmlContent = configureEmailVerification(newUser.firstname, returnLink);

                        const linkExpirationDate = dateInFuture2(24);

                        const msg = {
                            to: newUser.email,
                            from: PROJECT_EMAIL,
                            subject: 'Your PlaceMint email verification.',
                            html: htmlContent
                        };
                        sgMail.send(msg, (err) => {
                            if(Object.entries(err).length > 0) {
                                return res.status(500).json({success: false, msg: "Something went wrong; can't send validation email.", err});
                            }

                            return res.status(200).json({success: true, msg: "Check your email for your email verification link.", userInfo: {email: newUser.email, firstname: newUser.firstname}, link: returnLink, dateSent: new Date(), linkExprDate: linkExpirationDate});
                        })
                    }
                })
            }
        })
        .catch(err => {
            if(Object.entries(err).length > 0) {
                res.status(500).json({success: false, msg: "Something went wrong; couldn't register you just yet.", err});
            }
        })
    }

});

<<<<<<< HEAD
=======
// router.post('/resendVerificationEmail', (req, res) => {
//     let linkToSend = req.query.link;

// })
>>>>>>> master

router.post('/register/verifyEmail/:token', verifyToken, (req, res) => {
    jwt.verify(req.token, JWT_EMAIL_VERIFY_SIGN_KEY, JWT_EMAIL_VERIFY_SIGN_OPTIONS, (err, authData) => {
        if(err) {
            return res.status(403).json({success: false, msg: 'Invalid email verification link.', err});
        }
        else {
<<<<<<< HEAD
=======
            // let validUser = new User({
            //     ...authData.newUser,
            //     password: authData.newUser.password,
            //     isVerified: true
            // });
>>>>>>> master
            let validUser = null;
            if(authData.newUser.typeOfUser === "Student") {
                validUser = new Student({
                    ...authData.newUser,
                    password: authData.newUser.password,
                    isVerified: true,
                });
            }
            else if(authData.newUser.typeOfUser === "Recruiter") {
                validUser = new Recruiter({
                    ...authData.newUser,
                    password: authData.newUser.password,
                    isVerified: true
                });
            }
            else if(authData.newUser.typeOfUser === "Employer") {
                validUser = new Employer({
                    ...authData.newUser,
                    password: authData.newUser.password,
                    isVerified: true
                });
            }
            else {
                return res.status(403).json({success: false, msg: 'Invalid user type; please redo registeration.'});
            }

            User.findOne({email: validUser.email})
            .then(user => {
                if(user) {
                    return res.status(401).json({success: false, msg: 'This email is already verified'});
                }
                else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(validUser.password, salt, (err, hash) => {
                            if(err) {
                                return res.status(500).json({success: false, msg: 'Something went wrong, cannnot complete your registeration yet', err});
                            }
                            else {
<<<<<<< HEAD
                                console.log(validUser.password);
=======
>>>>>>> master
                                validUser.password = hash;
                                validUser.save()
                                .then(user => {
                                    res.status(200).json({success: true, msg: "You're registered! Proceed with logging in.", user});
            
                                })
                                .catch(err => {
                                    if(Object.entries(err).length > 0) {
                                        res.status(422).json({success: false, msg: "Something went wrong; couldn't register you now. Try the verification email link again.", err});
                                    }
                                })
                            }
                        })
                    });
                }
            })
            .catch(err => {
                if(Object.entries(err).length > 0) {
                    res.status(500).json({success: false, msg: "Something went wrong; couldn't register you now.", err});
                }
            })
        }
    })
});

router.post('/login', (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(422).json({msg: "Please enter all credentials."});
    }
    
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.status(403).json({success: false, msg: info.msg});
        }


        req.logIn(user, (err) => {
            if(err) {
                return next(err);
            }
            const userEmail = user.email;
            User.findOneAndUpdate(
                { email: userEmail },
                { $set: { isActive: true } }
            )
            .then(user => {
                if(user) {
                    req.user = user;
                    res.status(200).json({success: true, msg: "You've logged in successfully.", userInfo: user});
                }
                else {
                    res.status(403).json({success: false, msg: "This email is not registered."})
                }
            })
            .catch(err => {
                res.status(422).json({msg: "This email is not registered.", error: err});
            })
        })
    }) (req, res, next);
});

router.post('/logout', ensureAuthenticated, (req, res) => {
    User.findOneAndUpdate(
        { email: req.user.email },
        { $set: { isActive: false } }
    )
    .then(user => {
        req.logout();
        return res.status(200).json({success: true, msg: "You've been logged out."});
    })
    .catch(err => {
        req.logout();
        return res.status(500).json({success: false, msg: "Couldn't mark user as in active."});
    })
});

router.get('/verifyAuth/:userId', (req, res) => {
    if(req.user && req.user._id+'' === req.params.userId && req.session.passport.user === req.params.userId && req.isAuthenticated()) {
        return res.status(200).json({success: true, userAuthenticated: true, userInfo: req.user});
    }
    return res.status(401).json({success: false, userAuthenticated: false, userInfo: null});
});

router.put('/resetPasswordRequest', ensureAuthenticated, (req, res) => {
    
});

router.get('resetPasswordRequest/verification/:resetToken', (req, res) => {
    res.status(200);
});

router.get('/terminateAccount/request/:userId', ensureAuthenticated, (req, res) => {
    res.status(200);
});

router.get('/terminateAccount/verification/:terminationToken', (req, res) => {
    res.status(200);
});





module.exports = router;