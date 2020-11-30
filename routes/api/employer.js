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

const { ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');

const { JWT_EMAIL_VERIFY_SIGN_KEY_RECRUITER } = require('../../configs/prodConfig');


router.put('/completeBaiscProfile', ensureAuthorisation, (req, res) => {
    const { companyName, industry, location, shortDesc } = req.body;
    Employer.findOneAndUpdate(
        {_id: req.user.id},
        {
            $set: {
                companyName: companyName,
                industry: industry,
                location: location,
                basicProfileInfoComplete: true,
                shortDesc: shortDesc,
                isVerifiedCompany: true
            }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(employer => {
        return res.status(200).json({success: true, msg: "Completed employer basic profile.", employer});
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: "Something went wrong; couldn't complete your employer basic profile.", err});
    })
});

router.put('/editMatchProfile', ensureAuthorisation, (req, res) => {
    const { matchProfile } = req.body;
    Employer.findOneAndUpdate(
        {_id: req.user._id},
        {
            $set: { matchProfile: matchProfile}
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(employer => {
        res.status(200).json({success: true, msg: "Edited match profile.", employer});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Couldn't edit match profile.", err});
    })
});

router.put('/editProfile', ensureAuthorisation, (req, res) => {
    const {
        companyGrowthStage,
        approxNumEmployees,
        yearFounded,
        socials
    } = req.body;

    Employer.findOneAndUpdate(
        {_id: req.user._id},
        {
            $set: {
                companyGrowthStage: companyGrowthStage,
                approxNumEmployees: approxNumEmployees,
                yearFounded: yearFounded,
                socials: socials
            }
        },
        {
            returnNewDocument: true,
            new: true
        }
    )
    .then(employer => {
        res.status(200).json({success: true, msg: "Edited profile", employer});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong; couldn't edit profile", err});
    })
});

router.put('/verify-recruiter/:empId/:rToken', ensureAuthorisation, (req, res) => {
    if(!req.params.empId === req.user._id) {
        return res.status(403).json({success: false, msg: "You're not the employer this was meant for"})
    }

    jwt.verify(req.params.rToken, JWT_EMAIL_VERIFY_SIGN_KEY_RECRUITER, { }, (err, data) => {
        if(err) {
            return res.status(500).json({success: false, msg: "Something went wrong, couldn't verify recruiter.", err});
        }

        let rId = data.signUserInfo.uId;
        let recruiterInfo = data.signUserInfo;

        Recruiter.findOneAndUpdate(
            {_id: rId},
            {
                $set: {isCompanyVerified: true}
            },
            {
                new: true,
                returnNewDocument: true
            }
        )
        .then(recruiter => {
            if(recruiter && recruiter.companyId === req.user._id) {
                Employer.findOneAndUpdate(
                    {_id: req.user.id},
                    {
                        $push: {recruiters: recruiter._id}
                    },
                    {
                        new: true,
                        returnNewDocument: true
                    }
                )
                .then(employer => {
                    return res.status(200).json({success: true, msg: "We've verified your recruiter.", employer, recruiter: recruiterInfo});
                })
                .catch(err => {
                    return res.status(422).json({success: false, msg: "Couldn't add recruiter to list.", err});
                })
            }
            else {
                return res.status(403).json({success: false, msg: "This recruiter appears to no longer be registered on PlaceMint."});
            }
        })
        .catch(err => {
            return res.status(422).json({success: false, msg: "Something went wrong, couldn't verify recruiter", err});
        })
    })    
});

router.get('/getEmployer/:employerId', ensureAuthenticated, (req, res) => {
    Employer.findOne({_id: req.params.employerId})
    .then(employer => {
        if(!employer) {
            return res.status(422).json({success: false, msg: "Employer not found."});
        }
        employer.password = null;
        return res.status(200).json({success: true, msg: "Employer found.", employer});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong couldn't do employer search.", err});
    })
});

router.get('/getAllEmployers/:skip', ensureAuthenticated, (req, res) => {
    Employer.find()
    .sort({companyName: 1})
    .skip(Number(req.params.skip))
    .limit(21)
    .then(employers => {
        if(!employers || employers.length === 0) {
            return res.status(422).json({success: false, msg: Number(req.params.skip) > 21 ? "No employers left to load": "No employers registered", employers});
        }
        return res.status(200).json({success: true, msg: "Employers loaded", employers});
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: "Something went wrong; couldn't load employers.", err});
    })
});

router.get('/getByIndustry/:industry/:skip', ensureAuthenticated, (req, res) => {
    Employer.find({industry: req.params.industry})
    .sort({companyName: 1})
    .skip(Number(req.params.skip))
    .limit(21)
    .then(employers => {
        if(!employers || employers.length === 0) {
            return res.status(422).json({success: false, msg: Number(req.params.skip) > 21 ? `No ${req.params.industry} employers left to load`: `No ${req.params.industry} employers registered`, employers});
        }
        return res.status(200).json({success: true, msg: `${req.params.industry} employers loaded`, employers});
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: `Something went wrong; couldn't load ${req.params.industry} employers.`, err});
    })
});

router.get('/queryByName/:query', ensureAuthenticated, (req, res) => {
    Employer.find({companyName: { $regex: req.params.query, $options: 'i'} })
    .then(employers => {
        if(!employers) {
            return res.status(422).json({success: false, msg: "Employers not found."});
        }
        if(employers.length < 1) {
            Employer.find({_id: req.params.query})
            .then(employersById => {
                if(!employersById) {
                    return res.status(422).json({success: false, msg: "Employers not found."});
                }
                return res.status(200).json({success: true, msg: "Employer found by id.", employers: employersById})
            })
            .catch(err => {
                return res.status(422).json({success: false, msg: "Something went wrong; couldn't find employers.", err});
            })
        }
        else {
            return res.status(200).json({success: true, msg: employers.length > 0 ? "Search query done." : "No employers found", employers});
        }
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't query employers", err});
    })
});

router.post('/createJob', ensureAuthorisation, (req, res) => {
    const {
        title,
        description,
        company = req.user.companyName,
        dateOpen,
        location,
        todo,
        mustHaveSkills,
        recommendSkills,
        dateClose,
        matchProfile = req.user.matchProfile,
        matchLimit,
        typeOfJob,
        assignedRecruiters,
        industry
    } = req.body;

    const newJob = new Job({
        title, description, company, dateClose, location, todo, mustHaveSkills, recommendSkills, matchProfile,
        matchLimit, typeOfJob, isOpen: true, dateOpen, assignedRecruiters, industry: industry.toLowerCase()
    });
    newJob.save()
    .then(job => {
        return res.status(200).json({success: true, msg: "Created a new job listing.", job});
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: "Something went wrong, couldn't create jobs"});
    })
});

router.put('/editJob/:jobId', ensureAuthorisation, (req, res) => {
    const {
        title,
        description,
        location,
        todo,
        mustHaveSkills,
        recommendSkills,
        dateClose,
        matchLimit,
        typeOfJob,
        assignedRecruiters
    } = req.body;
    Job.findOneAndUpdate(
        {_id: req.params.jobId, company: req.user._id},
        {
            $set: {
                title: title,
                description: description,
                location: location,
                todo: todo,
                mustHaveSkills: mustHaveSkills,
                recommendSkills: recommendSkills,
                dateClose: dateClose,
                matchLimit: matchLimit,
                typeOfJob: typeOfJob,
                assignedRecruiters: assignedRecruiters
            }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(job => {
        if(!job) {
            return res.status(401).json({success: false, msg: "Must be the employer to edit job info."});
        }
        return res.status(200).json({success: true, msg: "Job info has been edited.", job});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't edit job info.", err});
    })
});

router.put('/unlistJob/:jobId', ensureAuthorisation, (req, res) => {
    Job.findOneAndUpdate(
        {_id: req.params.jobId, company: req.user._id},
        {
            $set: { isOpen: false }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(job => {
        if(!job) {
            return res.status(422).json({success: false, msg: "Job doesn't exist, or you're not authorised."});
        }
        return res.status(200).json({success: true, msg: "Job has been unlisted.", job});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't unlist job", err});
    })
});

router.put('/relistJob/:jobId', ensureAuthorisation, (req, res) => {
    Job.findOneAndUpdate(
        {_id: req.params.jobId, company: req.user._id},
        {
            $set: { isOpen: true }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(job => {
        if(!job) {
            return res.status(422).json({success: false, msg: "Job doesn't exist, or you're not authorised."});
        }
        return res.status(200).json({success: true, msg: "Job has been listed.", job});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't list job", err});
    })
});

router.delete('/removeJob/:jobId', ensureAuthorisation, (req, res) => {
    Job.findOneAndDelete({_id: req.params.jobId, company: req.user._id})
    .then(job => {
        if(!job) {
            return res.status(401).json({success: false, msg: "Must be company admin to delete job"});
        }
        res.status(200).json({success: false, msg: "Job has been removed.", job});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't remove job.", err});
    })
});

router.put('/assignRecruiter/:jobId/:recruiterId', ensureAuthorisation, (req, res) => {
   Recruiter.findOneAndUpdate(
       {_id: req.params.recruiterId, companyId: req.user._id},
       {
           $push: {jobsAssigned: req.params.jobId}
       },
       {
           new: true,
           returnNewDocument: true
       }
    )
   .then(recruiter => {
       if(!recruiter || !recruiter.companyId === req.user._id) {
            return res.status(401).json({success: false, msg: "Can only assign recruiters you employ."})
       }
       Job.findOneAndUpdate(
        {_id: req.params.jobId, company: req.user._id},
        {
            $set: { assignedRecruiter: req.params.recruiterId }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(job => {
        if(!job) {
            return res.status(401).json({success: false, msg: "Must be the employer to assign recruiters."});
        }
        return res.status(200).json({success: true, msg: "Recruiters have been assigend.", job});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong, couldn't assign recruiters to job.", err});
    })
   })
})

router.put('/swipeLeft/:studentId', ensureAuthorisation, (req, res) => {
});

router.put('/swipeRight/:studentId', ensureAuthorisation, (req, res) => {
});



module.exports = router;