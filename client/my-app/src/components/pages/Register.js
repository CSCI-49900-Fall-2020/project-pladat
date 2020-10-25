import React, { Component } from 'react';


import './styles/Register.css';
import './styles/Base.css';

import { Link, Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

import anime from 'animejs';

class Register extends Component {
    constructor(props) {
        super(props);
        this.errRef = React.createRef();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordConfirm: "",
            userType: "",
            userTypeId: null,
            authErrors: [],
            authErrorsMapper: [],
            formSubmitted: false,
            sumbitting: false,
            fakeIdIndex: 0,
            errorsLoaded: false,
            successfullSignUp: false,
            redirectCompToken: "",
            canRedirect: false
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.successfullSignUp === false || this.state.canRedirect;
    // }

    // componentDidMount() {
    //     this.props.actions.userActions.clearAuthErrors();
    //     this.props.actions.userActions.clearAuthState();
    //     this.popErr = this.popErr.bind(this);
    // }

    // componentDidUpdate(prevProps) {
    //     // user: {name: "William Matrix", email: "william.darko13@myhunter.cuny.edu"}
    //     // linkExpiration: "2020-01-18T15:24:51.554Z"
    //     // dateLinkSent: "2020-01-17T15:24:51.961Z"
        
    //     const { awaitingEmailVerification, preliminaryInfo, authError, authState, errorsDidChange } = this.props.user;

        
    //     if(this.state.formSubmitted && awaitingEmailVerification && (!authError || authError.length < 1) && authState === 'USER_AWAITING_EMAIL_VERIFICATION' && preliminaryInfo) {
    //         let data = {
    //             name: preliminaryInfo.user.name,
    //             email: preliminaryInfo.user.email,
    //             dateExpr: preliminaryInfo.linkExpiration,
    //             dateSent: preliminaryInfo.dateLinkSent
    //         };

    //         this.setState({
    //             sumbitting: false,
    //             successfullSignUp: true
    //         }, () => {
    //             this.handleOnSuccessRedirect(data);
    //         })
    //     }
    //     if(authError !== prevProps.user.authError && errorsDidChange === true && this.state.formSubmitted === true) {
    //         if(authError !== this.state.authErrors) {
    //             if(typeof authError == 'string') {
    //                 let tempArr = [];
    //                 tempArr.push({msg: authError});
    //                 this.setState({
    //                     authErrors: tempArr,
    //                     authErrorsMapper: tempArr,
    //                     errorsLoaded: true,
    //                     sumbitting: false
    //                 });
    //             }
    //             else {
    //                 this.setState({
    //                     authErrors: authError,
    //                     authErrorsMapper: authError,
    //                     errorsLoaded: true,
    //                     sumbitting: false
    //                 });
    //             }
    //         }
    //     }
    //     else {
    //         if(errorsDidChange === false && this.state.authErrorsMapper && this.state.authErrorsMapper.length === 0 && this.state.authErrors.length > 0 && this.state.formSubmitted === true) {
    //             let temp = this.state.authErrors;
    //             this.setState({
    //                 authErrorsMapper: temp,
    //                 errorsLoaded: true,
    //                 sumbitting: false
    //             })
    //         }
    //         if(errorsDidChange === false && this.state.authErrorsMapper && this.state.authErrorsMapper.length > 0 && this.state.authErrors.length > 0 && this.state.sumbitting === true) {
    //             this.setState({
    //                 sumbitting: false
    //             })
    //         }
    //     }
    // }

    // handleOnSuccessRedirect = (data) => {
    //     const jwt = require('jsonwebtoken');
    //     const SIGN_OPTIONS = {
    //         expiresIn: '24h'
    //     };
    //     jwt.sign({data}, ON_REGISTER_SUCCESS_KEY, SIGN_OPTIONS, (err, token) => {
    //         if(err) {
    //             console.log(err);
    //         }
    //         else {
    //             this.setState({
    //                 redirectCompToken: "/registeration-first-step-complete/"+token,
    //                 canRedirect: true
    //             })
    //         }
    //     })
    // }

    // errorOnShowAnimation = () => {
    //     anime({
    //         targets: '#auth-register-form-error-container .auth-form-error',
    //         delay: anime.stagger(80),
    //         visibility: 'visible',
    //         translateX: [
    //             {value: -40, duration: 80},
    //             {value: 40, duration: 80},
    //             {value: -40, duration: 80},
    //             {value: 40, duration: 80},
    //             {value: 0}
    //         ],
    //         easing: 'easeInOutBounce',
    //     });
    // }

    // popErr = (idx, iteration) => {
    //     if(this.state.authErrorsMapper.length == 1) {
    //         this.setState({
    //             authErrorsMapper: [],
    //             formSubmitted: false,
    //             fakeIdIndex: iteration+1
    //         })
    //     }
    //     else {
    //         const newArr = this.state.authErrorsMapper;
    //         let otherArr = newArr;
    //         otherArr.splice(idx, 1);
    //         this.setState({
    //             authErrorsMapper: otherArr,
    //             formSubmitted: false,
    //             fakeIdIndex: iteration+1
    //         })
    //     }
    // }

    // handleErrorRemoval = (event) => {
    //     event.preventDefault();
    //     const targetId = event.target.parentNode.id;
    //     const actualNode = event.target.parentNode;
    //     const index = parseInt(actualNode.getAttribute('data-key'));
    //     const oldIterationNum = parseInt(actualNode.getAttribute('error-iteration'));
    //     const func = this.popErr;

    //     let animePromise = new Promise((resolve, reject) => {
    //         anime({
    //             targets: actualNode,
    //             opacity: anime.stagger([1,0], {easing: 'easeOutCirc'}),
    //             translateY: [
    //                 {value: -100, easing: 'easeOutCirc'}
    //             ],
    //             duration: 400,
    //             easing: 'easeOutCirc',
    //             complete: function() {
    //                 window.setTimeout(function() {
    //                     resolve(true);
    //                 }, 50);
    //             }
    //         })
    //     })
    //     .then((val) => {
    //         if(val === true) {
    //             func(index, oldIterationNum);
    //         }
    //     })
    // }

   

    handleFormKeyPress = () => {

    }

    handleUserTypePick = (event) => {
        this.setState({
            userType: event.target.checked === true ? event.target.value: "",
            userTypeId: event.target.id
        }, () => {
           
            let userTypes = document.getElementsByClassName('auth-register-userTypeInput');
            for(let i = 0; i < userTypes.length; i++) {
                if(userTypes[i].id !== this.state.userTypeId) {
                    userTypes[i].checked = false;
                }
            }
        })
    }

    render() {
        if(this.state.canRedirect === true) {
            return <Redirect to={this.state.redirectCompToken}/>
        }
        if(this.state.errorsLoaded === true && this.state.authErrorsMapper && this.state.authErrorsMapper.length > 0  && this.state.formSubmitted) {
            this.errorOnShowAnimation();
        }
        // const { firstname, lastname, email, pass, passConf, userType } = req.body;

        return (
            <div className="page-wrapper" id="register-page-wrapper">

                <div className="auth-form-error-container" id="auth-register-form-error-container">
                    {
                        this.state.authErrorsMapper ?

                        this.state.authErrorsMapper.map((err, i) => {
                            return (
                                <span className="auth-form-error" error-iteration={this.state.fakeIdIndex} data-key={i} key={i+""+this.state.fakeIdIndex} id={this.state.fakeIdIndex+"-error-span"+i}>
                                    <span id={"close-btn"+i} className="auth-form-error-closebtn text" onClick={this.handleErrorRemoval}>&#10006;</span>
                                    <h3 className="text"> {err.msg} </h3>
                                </span>
                            )
                        })
                        :
                        ""
                    }
                </div>

                <div className="auth-form-wrapper" id="auth-register-form-wrapper">
                    <div className="auth-form-title">
                        <h1 className="text form-title" id="auth-form-register-title">Sign Up</h1>
                    </div>

                    <div className="auth-form-container" id="auth-register-form-container">

                        <div className="auth-form-container-left" id="auth-register-form-container-left">
                            <form id="auth-register-formElem">
                                <div className="auth-form-inputGroup auth-form-inputLine" id="auth-register-nameInputGroup-container">
                                    <input placeholder="firstname"/>
                                    <input placeholder="lastname" />
                                </div>
                                <div className="auth-form-inputLine" id="auth-register-emailInput-container">
                                    <input placeholder="email"/>
                                </div>
                                <div className="auth-form-inputGroup auth-form-inputLine" id="auth-register-userTypeInput-container">
                                    <span>
                                        <h2>I'm a: </h2>
                                    </span>
                                    <span>
                                        <label htmlFor="student" className="text">Student</label>
                                        <input type="checkbox" name="student" value="Student" id="auth-register-userTypeInput-student" className="auth-register-userTypeInput" onKeyPress={this.handleFormKeyPress} onClick={this.handleUserTypePick}/>
                                    </span>
                                    
                                    <span>
                                        <label htmlFor="employer" className="text">Employer</label>
                                        <input type="checkbox" name="employer" value="Employer" id="auth-register-userTypeInput-employer" className="auth-register-userTypeInput" onKeyPress={this.handleFormKeyPress} onClick={this.handleUserTypePick}/>
                                    </span>

                                    <span>
                                        <label htmlFor="recruiter" className="text">Recruiter</label>
                                        <input type="checkbox" name="recruiter" value="Recruiter" id="auth-register-userTypeInput-recruiter" className="auth-register-userTypeInput" onKeyPress={this.handleFormKeyPress} onClick={this.handleUserTypePick}/>
                                    </span>
                                    
                                </div>
                                <div className="auth-form-inputGroup auth-form-inputLine" id="auth-register-passInputGroup-container">
                                    <input placeholder="password"/>
                                    <input placeholder="confirm password"/>
                                </div>
                                <div className="auth-form-inputLine auth-form-submitBtn-container" id="auth-register-submitBtnContainer">
                                    <button className="auth-from-submitBtn">
                                        <h2 className="text">
                                            Sign Up
                                        </h2>
                                    </button>
                                </div>

                                <div className="auth-form-redirectLinks" id="auth-register-form-redirectLinks">
                                    <span><Link to="/login"><h3>Already have an account? <span>Log in.</span></h3></Link></span>
                                </div>
                            </form>

                        </div>

                        <div className="auth-form-container-right" id="auth-register-form-container-right">
                            Nice logo or mint svg goes here
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
        
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            userActions: bindActionCreators(allUserActions, dispatch),
        }
    };
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);