import React, { Component } from 'react';

import './styles/Base.css';
import './styles/forgotpassword.css'

import { Link, Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

import anime from 'animejs';
import ButtonLoader from '../uiComponents/ButtonLoader';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.errRef = React.createRef();
        this.state = {
            email: null,
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

    componentDidMount() {
        console.log('login page mounted idkkk');
        this.props.actions.userActions.clearAuthErrors();
        this.props.actions.userActions.clearAuthState();
        if(this.props.location.state) {
            if(this.props.location.state.email) {
                const passedEmail = this.props.location.state.email;
                this.setState({
                    email: passedEmail
                })
            }
        }
    }

    errorOnShowAnimation = () => {
        anime({
            targets: '#auth-register-form-error-container .auth-form-error',
            delay: anime.stagger(80),
            visibility: 'visible',
            translateX: [
                {value: -40, duration: 80},
                {value: 40, duration: 80},
                {value: -40, duration: 80},
                {value: 40, duration: 80},
                {value: 0}
            ],
            easing: 'easeInOutBounce',
        });
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
                        <h1 className="text form-title" id="auth-form-login-title">Reset Password</h1>
                    </div>
                    <div className="auth-form-container">
                    <div className="auth-form-container-center">
                            <form id="auth-login-formElem">
                                <div className="auth-form-inputLine" id="auth-reset-emailInput-container">
                                    <input type="email" value={this.state.email} onChange={this.handleEmailInput} onKeyPress={this.handleFormKeyPress} placeholder="email"/>
                                </div>
                                <div className="auth-form-inputLine reset-passwordBtn-container" id="auth-reset-button-container">
                                    <button onClick={this.handleFormSubmit} className="auth-form-submitBtn">
                                        {this.state.submitting ? <ButtonLoader /> : <h2 className="text">Reset</h2>}
                                    </button>
                                </div>

                                <div className="auth-form-redirectLinks">
                                    <span><Link to="/login"><h3>Remember your password? <span>Log in.</span></h3></Link></span>
                                    <span><Link to="/register"><h3>Don't have an account? <span>Sign up.</span></h3></Link></span>
                                </div>
                            </form>
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Forgot);