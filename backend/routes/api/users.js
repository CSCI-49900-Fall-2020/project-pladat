const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');

const User = require('../../models/User');
const { forwardAuthentication, ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');



router.post('/register/:userType', (req, res) => {
    res.status(200).json({success: true, msg: 'successful registeration'});
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