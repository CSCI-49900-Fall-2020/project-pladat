const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');

const User = require('../../models/User');
const { forwardAuthentication, ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');

function verifyToken(req, res, next) {
    req.token = req.query.token;
    if(!req.token || typeof req.token === 'undefined' || typeof req.token === null) {
        return res.status(403).json({success: false, msg: "Invalid email verification link, or your link has expired."});
    }
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
        return res.status(422).json({success: false, msg: 'Please enter all fields.'});
    }
    else if(firstname.length < 1 || lastname.length < 1 || email.length < 1 || pass.length < 1 || passConf.length < 1|| userType.length < 1) {
        return res.status(422).json({success: false, msg: 'Please enter all fields.'});
    }
    else if(!isvalidemail) {
        return res.status(422).json({success: false, msg: 'Please enter a valid email address.'});
    }
    else if(pass.length < 8) {
        return res.status(422).json({success: false, msg: 'Passwords should be at least 8 characters, and a mix of letters, numbers, and symbols'});
    }
    else if(pass !== passConf) {
        return res.status(422).json({success: false, msg: 'Passwords must match.'});
    }
    else if(userType !== 'student' || userType !== 'recruiter' || userType !== 'employer') {
        return res.status(422).json({success: false, msg: 'Invalid user type.'});
    }
    else {
        // send verification email here
    }

});

router.get('/register/verifyEmail', (req, res) => {
    res.status(200).json({success: true});
});

router.post('/login', (req, res, next) => {
    res.status(200).json({success: true});
});

router.post('/logout', (req, res) => {
    res.status(200);
});

router.get('/verifyAuth/:userId', (req, res) => {
    res.status(200);
});

router.put('/resetPasswordRequest', (req, res) => {
    res.status(200);
});

router.get('resetPasswordRequest/verification/:resetToken', (req, res) => {
    res.status(200);
});

router.get('/terminateAccount/request/:userId', (req, res) => {
    res.status(200);
});

router.get('/terminateAccount/verification/:terminationToken', (req, res) => {
    res.status(200);
});





module.exports = router;