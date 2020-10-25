import React, { Component } from 'react';

import './styles/Login.css';
import './styles/Base.css';

import { Link, Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

import anime from 'animejs';

class Login extends Component {
    constructor(props) {
        super(props);
        this.errRef = React.createRef();
        this.state = {
            email: null,
            password: null,
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

    errorOnShowAnimation = () => {

    }


    render() {
        if(this.state.canRedirect === true) {
            return <Redirect to={this.state.redirectCompToken}/>
        }
        if(this.state.errorsLoaded === true && this.state.authErrorsMapper && this.state.authErrorsMapper.length > 0  && this.state.formSubmitted) {
            this.errorOnShowAnimation();
        }

        return (
            <div className="page-wrapper" id="login-page-wrapper">

                <div className="auth-form-error-container" id="auth-login-form-error-container">
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

                <div className="auth-form-wrapper" id="auth-login-form-wrapper">
                    <div className="auth-form-title">
                        <h1 className="text form-title" id="auth-form-login-title">Log In</h1>
                    </div>

                    <div className="auth-form-container" id="auth-login-form-container">

                        <div className="auth-form-container-left" id="auth-login-form-container-left">
                            <form id="auth-login-formElem">
                                <div className="auth-form-inputLine" id="auth-login-emailInput-container">
                                    <input placeholder="email"/>
                                </div>
                                <div className="auth-form-inputLine" id="auth-login-passInput-container">
                                    <input placeholder="password"/>
                                </div>
                           
                                <div className="auth-form-inputLine auth-form-submitBtn-container" id="auth-login-submitBtnContainer">
                                    <button className="auth-from-submitBtn">
                                        <h2 className="text">
                                            Log in
                                        </h2>
                                    </button>
                                </div>

                                <div className="auth-form-redirectLinks" id="auth-login-form-redirectLinks">
                                    <span><Link to="/login"><h3>Forgot password? <span>Send email.</span></h3></Link></span>
                                    <span><Link to="/register"><h3>Don't have an account? <span>Sign up.</span></h3></Link></span>
                                </div>
                            </form>

                        </div>

                        <div className="auth-form-container-right" id="auth-login-form-container-right">
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);