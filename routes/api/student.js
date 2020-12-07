const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const passport = require('passport');

const User = require('../../models/User');
const Student = require('../../models/Student');
const Job = require('../../models/Job');
const MatchProfile = require('../../models/MatchProfile');
const Match = require('../../models/Match');

const { forwardAuthentication, ensureAuthenticated, ensureAuthorisation } = require('../../configs/authorise');



router.put('/completeBasicProfile', ensureAuthorisation, (req, res) => {
    const {
        university,
        major,
        graduationDate,
        shortDesc,
        preferredRoles,
        generalExperience,
        skills
    } = req.body;

    if(!university || !major || !graduationDate || !shortDesc || !preferredRoles || !generalExperience || !skills) {
        return res.status(401).json({success: false, msg: "Please enter all data."});
    }
    let prefRoles = preferredRoles.reduce((a, b) => (a[b]=0,a),{});
    let studMatchProfile = new MatchProfile({
        userId: req.user._id,
        psychType: 'Student',
        candidates: [],
        university: university,
        majors: major,
        skills: skills,
        experience: generalExperience,
        roles: {
            ...prefRoles
        },
        
        ir: req.user.internalRank,
        personality: [],
        locations: {},
        jobTypes: {},
        companies: {},
        cgs: {},
        industries: {},
        workEnv: {},
        compOffers: {},
        todos: {}
    });
    studMatchProfile.save()
    .then(matchProf => {
       if(!matchProfile) {
           return res.status(422).json({success: false, msg: "Couldn't edit basic profile"});
       }
       Student.findOneAndUpdate(
           {_id: req.user._id},
           {
               $set: {
                   matchProfile: matchProf._id,
                   university: university,
                   major: major,
                   skills: skills,
                   shortDesc: shortDesc,
                   graduationDate: graduationDate,
                   preferredRoles: preferredRoles,
                   generalExperience: generalExperience
               }
           },
           {
               new: true,
               returnNewDocument: true
           }
       )
       .then(student => {
            return res.status(200).json({success: true, msg: "Created match profile, and edited basic", student, matchProf});
       })
       .catch(err => {
           return res.status(422).json({success: false, msg: "Created match profile, but couldn't edit basic.", err});
       })
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: 'Edited basic info, but failed to make match profile.', err, student});
    });
});


router.put('/updateMatchProfile', ensureAuthorisation, (req, res) => {
    const { values } = req.user;

    let offers = Object.assign({},...values.compVals.map(key => ({[key]: 0})));
    let workEnv = Object.assign({},...values.workEnv.map(key => ({[key]: 0})));
    let stage = Object.assign({},...values.compStage.map(key => ({[key]: 0})));
    let inds = Object.assign({},...values.industry.map(key => ({[key]: 0})));
    let pers = values.personality;

    MatchProfile.findOneAndUpdate(
        {_id: req.user.matchProfile},
        {
            $set: {
                personality: pers,
                cgs: stage,
                industries: inds,
                workEnv: workEnv,
                compOffers: offers,
            }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(mp => {
        return res.status(200).json({success: true, msg: 'updated match profile', mp});
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: "couldn't update match profile", err});
    })
});


router.put('/editProfile', ensureAuthorisation, (req, res) => {
    const {
        university,
        major,
        graduationDate,
        shortDesc,
        skills,
        resume,
        values,
        preferredRoles,
        generalExperience,
        socials
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
                socials,
                generalExperience,
                preferredRoles
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

router.get('/getStudent/:sId', ensureAuthenticated, (req, res) => {
    Student.findOne({_id: req.params.sId})
    .then(student => {
        if(!student) {
            return res.status(422).json({success: false, msg: "Student not found"})
        }
        const returnedStudent = { ...student, password: null};
        return res.status(200).json({success: true, msg: "Student found", student: {...returnedStudent}});
    })
    .catch(err => {
        res.status(422).json({success: false, msg: "Something went wrong; couldn't find student.", err});
    })
})

router.put('/swipeRight/:jobId', ensureAuthorisation, (req, res) => {
    Job.findOneAndUpdate(
        {_id: req.params.jobId},
        {
            $push: { swipedRightOnMe:req.user.matchProfile },
            $inc: { numApplicants: 1 }
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(swipedJob => {
        MatchProfile.findOne({_id: swipedJob.matchProfile})
        .then(empMatchProf => {
            MatchProfile.findOne({_id: req.user.matchProfile})
            .then(studMatchProf => {
                const isMatch = swipedJob.swipedRightOnMe.includes(req.user._id) && studMatchProf.swipedRightOnMe.includes(empMatchProf._id);

                if(isMatch) {
                    let newMatch = new Match({
                        jobId: swipedJob._id,
                        employerId: swipedJob.companyId,
                        studentId: req.user._id,
                        recruiterId: swipedJob.assignedRecruiter,
                        matchDate: Date.now(),
                        matchEnd: swipedJob.dateClose
                    });
                    newMatch.save()
                    .then(newMatch => {
                        MatchProfile.findOneAndUpdate(
                            {_id: empMatchProf._id},
                            {
                                $push: {swipedRightOnMe: studMatchProf._id, matches: newMatch._id},
                                $set: {ir: (empMatchProf.swipedRightOnMe.length+1)/empMatchProf.swipedLeftOnMe.length}
                            }
                        )
                        .then(updatedEmpMatchProf => {
                            let tempMp = studMatchProf;
                            tempMp.companies[empMatchProf.userId] ? tempMp.companies[empMatchProf.userId]++ : tempMp.companies[empMatchProf.userId] = 0;
                            empMatchProf.industries.map((ind, idx) => {
                                tempMp.industries[ind] ? tempMp.industries[ind]++ : tempMp.industries[ind]= 0
                            });
                            empMatchProf.compOffers.map((offer, idx) => {
                                tempMp.compOffers[offer] ? tempMp.compOffers[offer]++ : tempMp.compOffers[offer] = 0
                            });
                            empMatchProf.workEnv.map((env, idx) => {
                                tempMp.workEnv[env] ? tempMp.workEnv[env]++ : tempMp.workEnv[env] = 0
                            });
                            empMatchProf.cgs.map((stage, idx) => {
                                tempMp.cgs[stage] ? tempMp.cgs[stage]++ : tempMp.cgs[stage] = 0
                            });
                            tempMp.jobTypes[swipedJob.typeOfJob] ? tempMp.jobTypes[swipedJob.typeOfJob]++ : tempMp.jobTypes[swipedJob.typeOfJob] = 0;
                            MatchProfile.findOneAndUpdate(
                                {_id: req.user.matchProfile},
                                {
                                    $set: {
                                        ...tempMp
                                    },
                                    $push: {matches: newMatch._id}
                                },
                                {
                                    new: true,
                                    returnNewDocument: true
                                }
                            )
                            .then(finalSM => {
                                return res.status(200).json({success: true, msg: "Swiped right on job, and updated match profile", matchProf: finalSM, isMatch: true});
                            })
                            .catch(err => {
                                return res.status(422).json({success: false, msg: "Something went wrong trying to update you match profile"}, err);
                            })
                        })
                        .catch(err => {
                            return res.status(422).json({success: false, msg: "Something went wrong trying to update employer match profile", err});
                        })
                    })
                    .catch(err => {
                        return res.status(422).json({success: false, msg: 'Something went wrong creating match', err});
                    })
                }
                else {
                    MatchProfile.findOneAndUpdate(
                        {_id: empMatchProf._id},
                        {
                            $push: {swipedRightOnMe: studMatchProf._id},
                            $set: {ir: (empMatchProf.swipedRightOnMe.length+1)/empMatchProf.length.swipedLeftOnMe}
                        }
                    )
                    .then(updatedEmpMatchProf => {
                        let tempMp = studMatchProf;
                        tempMp.companies[empMatchProf.userId] ? tempMp.companies[empMatchProf.userId]++ : tempMp.companies[empMatchProf.userId] = 0;
                        empMatchProf.industries.map((ind, idx) => {
                            tempMp.industries[ind] ? tempMp.industries[ind]++ : tempMp.industries[ind]= 0
                        });
                        empMatchProf.compOffers.map((offer, idx) => {
                            tempMp.compOffers[offer] ? tempMp.compOffers[offer]++ : tempMp.compOffers[offer] = 0
                        });
                        empMatchProf.workEnv.map((env, idx) => {
                            tempMp.workEnv[env] ? tempMp.workEnv[env]++ : tempMp.workEnv[env] = 0
                        });
                        empMatchProf.cgs.map((stage, idx) => {
                            tempMp.cgs[stage] ? tempMp.cgs[stage]++ : tempMp.cgs[stage] = 0
                        });
                        tempMp.jobTypes[swipedJob.typeOfJob] ? tempMp.jobTypes[swipedJob.typeOfJob]++ : tempMp.jobTypes[swipedJob.typeOfJob] = 0;
                        MatchProfile.findOneAndUpdate(
                            {_id: req.user.matchProfile},
                            {
                                $set: {
                                    ...tempMp
                                }
                            },
                            {
                                new: true,
                                returnNewDocument: true
                            }
                        )
                        .then(finalSM => {
                            return res.status(200).json({success: true, msg: "Swiped right on job, and updated match profile", matchProf: finalSM, isMatch: false});
                        })
                        .catch(err => {
                            return res.status(422).json({success: false, msg: "Something went wrong trying to update you match profile"}, err);
                        })
                    })
                    .catch(err => {
                        return res.status(422).json({success: false, msg: "Something went wrong trying to update employer match profile", err});
                    })
                }

            })
            .catch(err => {
                return res.status(422).json({success: false, msg: "Something went wrong trying to update your match profile", err});
            })
        })
        .catch(err => {
            return res.status(422).json({success: false, msg: "Something went wrong trying to update employer match profile", err});
        })
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: "Something went wrong trying to swipe right on job.", err});
    })
})

router.put('/swipeLeft/:jobId', ensureAuthorisation, (req, res) => {
    Job.findOneAndUpdate(
        {_id: req.params.jobId},
        {
            $push: {swipedLeftOnMe: req.user.matchProfile}
        },
        {
            new: true,
            returnNewDocument: true
        }
    )
    .then(swipedLeftJob => {
        MatchProfile.findOne({_id: swipedLeftJob.matchProfile})
        .then(swipedleftEmpProf => {
            MatchProfile.findOneAndUpdate(
                {_id: swipedLeftJob.matchProfile},
                {
                    $push: {swipedLeftOnMe: req.user.matchProfile},
                    $set: {ir: swipedleftEmpProf.swipedRightOnMe.length/swipedleftEmpProf.swipedLeftOnMe.length+1}
                },
                {
                    new: true,
                    returnNewDocument: true
                }
            )
            .then(slj => {
                return res.status(200).json({success: true, msg: "Swiped left on job, no match prof update needed"});
            })
            .catch(err => {
                return res.status(422).json({success: false, msg: "Something went wrong trying to swipe left on job", err})
            })
        })
        .catch(err => {
            return res.status(422).json({success: false, msg: "Something went wrong trying to swipe left on job", err})
        })
    })
    .catch(err => {
        return res.status(422).json({success: false, msg: "Something went wrong trying to swipe left on job", err})
    })
});


module.exports = router;