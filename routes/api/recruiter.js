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




router.put('/completeBaiscProfile', ensureAuthorisation, (req, res) => {
    const { education, jobTitle, shortDesc, company } = req.body;

    if(!education || !jobTitle || !shortDesc || !company) {
        return res.status(401).json({success: false, msg: "Please enter all the required information."});
    }

    Employer.findOne({companyName: company, isVerifiedCompany: true, isVerfied: true, basicProfileInfoComplete: true})
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
                            company: employer.companyName,
                            shortDesc: shortDesc,
                            basicProfileInfoComplete: true,
                            companyId: employer._id
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

router.put('/completeMatchProfile', ensureAuthorisation, (req, res) => {
    const { automatedMatchMsg, matchProfile } = req.body;
    Recruiter.findOneAndUpdate(
        {_id: req.user._id},
        {
            $set: {
                automatedMatchMsg: automatedMatchMsg,
                matchProfile: matchProfile
            }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(recruiter => {
        return res.status(200).json({success: true, msg: "Edited match profile.", recruiter});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong; couldn't edit match profile.", err});
    })
    
});

router.put('/editProfile', ensureAuthorisation, (req, res) => {
    const {
        education,
        jobTitle,
        shortDesc,
        socials
    } = req.body;
    Recruiter.findOneAndUpdate(
        {_id: req.user._id},
        {
            $set: {
                education: education,
                jobTitle: jobTitle,
                shortDesc: shortDesc,
                socials: socials
            }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(recruiter => {
        res.status(200).json({success: true, msg: "Changed profile.", recruiter});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong; couldn't edit profile.", err});
    })
});

router.get('/getRecruiter/:rId', ensureAuthenticated, (req, res) => {
    Recruiter.findOne({_id: req.params.rId})
    .then(recruiter => {
        if(!recruiter) {
            return res.status(422).json({success: false, msg: "Recruiter doesn't exist"})
        }
        let returnedRecruiter = { ...recruiter, password: null };
        return res.status(200).json({success: true, msg: "Recruiter found.", recruiter: {...returnedRecruiter}})
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong; couldn't find recruiter.", err});
    })
});

router.get('/getRecruiterOnJob/:jobId', ensureAuthenticated, (req, res) => {
    Job.findOne({_id: req.params.jobId})
    .then(job => {
        if(!job) {
            return res.status(422).json({success: false, msg: "Job doesn't exist"});
        }
        // const returnedRecruiter = { ...job.assignedRecruiter, password: null };
        return res.status(200).json({success: true, msg: "Recruiters for job found.", recruiter: job.assignedRecruiter});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't get recruiters for this job", err});
    })
});

router.get('/getRecruitersForCompany/:empId', ensureAuthenticated, (req, res) => {
    Recruiter.find({companyId: req.params.empId})
    .then(recruiters => {
        if(!recruiters) {
            return res.status(422).json({success: false, msg: "recruiters not found for this company"});
        }
        return res.status(200).json({success: true, msg: "Recruiters found for company.", recruiters});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong; recruiters not found for this company", err});
    })
});


router.put('/swipeRight/:studentId', ensureAuthorisation, (req, res) => {
   
});

router.put('/swipeLeft/:studentId', ensureAuthorisation, (req, res) => {
   
})


module.exports = router;