const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');

const User = require('../../models/User');
const Recruiter = require('../../models/Recruiter');
const Employer = require('../../models/Employer');
const Job = require('../../models/Job');

const { forwardAuthentication, ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');



router.put('/recruiter/completeBaiscProfile', ensureAuthorisation, (req, res) => {
    const { education, jobTitle, shortDesc, company } = req.body;

    if(!education || !jobTitle || !shortDesc || !company) {
        return res.status(401).json({success: false, msg: "Please enter all the required information."});
    }

    Employer.findOneAndUpdate(
        {companyName: company},
        {
            $push: {recruiters: req.user._id}
        },
        {
            returnNewDocument: true,
            new: true
        }
    )
    .then(employer => {
        if(!employer) {
            return res.status(403).json({success: false, msg: "You're employer must be registered on this platform."});
        }
        Recruiter.findOneAndUpdate(
            {_id: req.user._id},
            {
                $set: {
                    education: education,
                    jobTitle: jobTitle,
                    shortDesc: shortDesc,
                    basicProfileInfoComplete: true,
                    company: company
                }
            }
        )
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Couldn't find your employer. Try again.", err});
    })
    
})


router.put('/recruiter/completeMatchProfile', ensureAuthenticated, (req, res) => {
    const { automatedMatchMsg, matchProfile } = req.body;

    User.findOne

});

router.put('/recruiter/editProfile', ensureAuthenticated, (req, res) => {
    const {
     
    } = req.body;
});

router.put('/recruiter/swipeRight/:jobId', ensureAuthenticated, (req, res) => {
   
});

router.put('/recruiter/swipeLeft/:jobId', ensureAuthenticated, (req, res) => {
   
})


module.exports = router;