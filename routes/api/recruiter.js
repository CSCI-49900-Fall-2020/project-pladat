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

const { SENDGRID_APIKEY, CLIENT_ORIGIN, JWT_EMAIL_VERIFY_SIGN_KEY_RECRUITER, PROJECT_EMAIL} = require('../../configs/prodConfig');

const { recruiterConfigEmail } = require('../../configs/RecruiterVerification');



router.put('/recruiter/completeBaiscProfile', ensureAuthorisation, (req, res) => {
    const { education, jobTitle, shortDesc, company } = req.body;

    if(!education || !jobTitle || !shortDesc || !company) {
        return res.status(401).json({success: false, msg: "Please enter all the required information."});
    }

    Employer.findOne({companyName: company})
    .then(employer => {
        if(!employer) {
            return res.status(403).json({success: false, msg: "You're employer must be registered on this platform."}); 
        }
        
        /* Send verificaiton email to employer, then write to db */

        let signUserInfo = { name: req.user.firstname + " " + req.user.lastname, email: req.user.email, uId: req.user._id};

        jwt.sign({signUserInfo}, JWT_EMAIL_VERIFY_SIGN_KEY_RECRUITER, { }, (err, token) => {
            if(err) {
                return res.status(500).json({success: false, msg: 'Something went wrong trying to verify you as a recruiter', err});
            }

            sgMail.setApiKey(SENDGRID_APIKEY);

            const returnLink = `${CLIENT_ORIGIN}/employer/verify-recruiter/${employer._id}/${token}`;

            const htmlContent = recruiterConfigEmail(employer.firstname, returnLink, employer.companyName, req.user.email, req.user.firstname + " " + req.user.lastname);

            const msg = {
                to: employer.email,
                from: PROJECT_EMAIL,
                subject: 'PlaceMint recruiter verification email for ' + employer.companyName,
                html: htmlContent
            };
            sgMail.send(msg, (err) => {
                if(Object.entries(err).length > 0) {
                    return res.status(500).json({success: false, msg: "Something went wrong; can't send validation email.", err});
                }

                Recruiter.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $set: {
                            education: education,
                            jobTitle: jobTitle,
                            company: company,
                            shortDesc: shortDesc
                        }
                    },
                    {
                        new: true,
                        returnNewDocument: true
                    }
                )
                .then(recruiter => {
                    return res.status(200).json({success: true, msg: "An email has been sent to your employer to verify you.", recruiter});
                })
                .catch(err => {
                    return res.status(500).json({success: false, msg: "Couldn't edit your basic profile", err});
                })
            });
            
        });

    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Couldn't find your employer. Try again.", err});
    })
})


router.put('/recruiter/completeMatchProfile', ensureAuthenticated, (req, res) => {
    const { automatedMatchMsg, matchProfile } = req.body;
    
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