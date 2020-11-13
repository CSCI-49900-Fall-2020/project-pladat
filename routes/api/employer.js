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

import { ensureAuthenticated, ensureAuthorisation } from '../../configs/authorise';


router.put('/employer/completeBaiscProfile', ensureAuthorisation, (req, res) => {
    const { companyName, industry, location } = req.body;
    Employer.findOneAndUpdate(
        {_id: req.user.id},
        {
            $set: {
                companyName: companyName,
                industry: industry,
                location: location
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

router.put('/employer/verify-recruiter/:rId', ensureAuthorisation, (req, res) => {

});



module.exports = router;