const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');

const User = require('../../models/User');
const Student = require('../../models/Student');
const Job = require('../../models/Job');

const { forwardAuthentication, ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');



router.put('/student/completeBaiscProfile', ensureAuthenticated, (req, res) => {
    const {
        university,
        major,
        graduationDate,
        shortDesc,
        preferredRoles,
        generalExperience
    } = req.body;

    if(!university || !major || !graduationDate || !shortDesc || !preferredRoles || !generalExperience) {
        return res.status(401).json({success: false, msg: "Please enter all data."});
    }
    Student.findOneAndUpdate(
        {_id: req.user.id},
        {
            $set: {
                university,
                major,
                graduationDate,
                shortDesc,
                preferredRoles,
                generalExperience,
                basicProfileInfoComplete: true
            }
        },
        {
            returnNewDocument: true,
            new: true
        }
    )
    .then(student => {
        if(student) {
            return res.status(200).json({success: true, msg: "You've completed your basic profile.", student});
        }
        else {
            return res.status(422).json({success: false, msg: 'Something went wrong editing your profile'});
        }
    })
    .catch(err => {
        res.status(422).json({success: false, msg: 'Something went wrong tyring to edit your profile; try again.', err});
    })
})


router.put('/student/completeMatchProfile', ensureAuthenticated, (req, res) => {
    const { matchProfile, resume, values, socials } = req.body;

    Student.findOneAndUpdate(
        {_id: req.user.id},
        {
            $set: {
                resume,
                values,
                matchProfile,
            }
        },
        {
            returnNewDocument: true,
            new: true
        }
    )
    .then(student => {
        if(student) {
            return res.status(200).json({success: true, msg: 'Some edits have been made to your match profile.', student});
        }
        else {
            return res.status(422).json({success: false, msg: 'Something went wrong editing your match profile'});
        }
    })
    .catch(err => {
        res.status(422).json({success: false, msg: 'Something went wrong tyring to edit your match profile; try again.', err});
    })
});

router.put('/student/editProfile', ensureAuthenticated, (req, res) => {
    const {
        university,
        major,
        graduationDate,
        shortDesc,
        skills,
        resume,
        values,
        matchProfile
    } = req.body;

    Student.findOneAndUpdate(
        {_id: req.user.id},
        {
            $set: {
                university,
                major,
                graduationDate,
                shortDesc,
                skills,
                resume,
                values,
                matchProfile,
                socials
            }
        },
        {
            returnNewDocument: true,
            new: true
        }
    )
    .then(student => {
        if(student) {
            return res.status(200).json({success: true, msg: 'Some edits have been made to your profile.', student});
        }
        else {
            return res.status(422).json({success: false, msg: 'Something went wrong editing your profile'});
        }
    })
    .catch(err => {
        res.status(422).json({success: false, msg: 'Something went wrong tyring to edit your profile; try again.', err});
    })
});

router.put('/student/swipeRight/:jobId', ensureAuthenticated, (req, res) => {
    let srs = req.user.swipedRight;
    let sls = req.user.swipedLeft;

    let viewed = srs.includes(req.params.jobId) || sls.includes(req.params.jobId);

    if(viewed) {
        return req.status(403).json({success: true, msg: 'Already swiped on job.', jId: req.params.jobId});
    }
    else {
        Job.findOneAndUpdate(
            {_id: req.params.jobId},
            {
                $push: {
                    witnessed: 'r-'+req.user.id,
                    swipeRights: 'r'+req.user.id
                }
            },
            {
                returnNewDocument: true,
                new: true
            }
        )
        .then(job => {
            if(!job) {
                return res.status(422).json({success: false, msg: 'This job seems to be unlisted.'});
            }
            Student.findOneAndUpdate(
                {_id: req.user.id},
                {
                    $push: {
                        swipedRight: job._id
                    }
                }, 
                {
                    returnNewDocument: true,
                    new: true    
                }
            )
            .then(student => {
                return res.status(200).json({success: true, msg: "you've swiped right on this job.", student, job});
            })
            .catch(err => {
                return res.status(422).json({success: false, msg: "Couldn't update right swipes", job});
            });
        })
        .catch(err => {
            return res.status(422).json({success: false, msg: "Couldn't swipe right on job", err});
        })
    }
});

router.put('/student/swipeLeft/:jobId', ensureAuthenticated, (req, res) => {
    let srs = req.user.swipedRight;
    let sls = req.user.swipedLeft;

    let viewed = srs.includes(req.params.jobId) || sls.includes(req.params.jobId);

    if(viewed) {
        return req.status(403).json({success: true, msg: 'Already swiped on job.', jId: req.params.jobId});
    }
    else {
        Job.findOneAndUpdate(
            {_id: req.params.jobId},
            {
                $push: {
                    witnessed: 'l-'+req.user.id,
                }
            },
            {
                returnNewDocument: true,
                new: true
            }
        )
        .then(job => {
            if(!job) {
                return res.status(422).json({success: false, msg: 'This job seems to be unlisted.'});
            }
            Student.findOneAndUpdate(
                {_id: req.user.id},
                {
                    $push: {
                        swipedLeft: job._id
                    }
                }, 
                {
                    returnNewDocument: true,
                    new: true    
                }
            )
            .then(student => {
                return res.status(200).json({success: true, msg: "you've swiped left on this job.", student, job});
            })
            .catch(err => {
                return res.status(422).json({success: false, msg: "Couldn't update left swipes", job});
            });
        })
        .catch(err => {
            return res.status(422).json({success: false, msg: "Couldn't swipe left on job", err});
        })
    }
})


module.exports = router;