import React, { Component } from 'react';

import TypingText from '../uiComponents/TypingText';

import './styles/Landing.css';
import './styles/Base.css';

import { Link, Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };


    render() {
        return (
            <div className="page-wrapper" id="landing-page-wrapper">

                <div className="wrapper-inner-container" id="landing-container-left">
                    <div id="landing-text-container" className="landing-left-part">
                        <h1 className="text" id="landing-page-header">Place<span>Mint</span></h1>
                        <TypingText statements={["We're literally tinder, but for you to get a job, you knobhead...", "Stop swiping on girls, and swipe on potential internship rejections", "Stop simping bro, she's not gonna text you back...", "...get on PlaceMint and message a recruiter instead."]}/>
                    </div>
                    <div id="landing-button-container" className="landing-left-part">
                        <div className="landing-auth-btns" id="landing-signup-btn"><h2 className="text">Sign Up</h2></div>
                        <div className="landing-auth-btns" id="landing-login-btn"><h2 className="text">Login</h2></div>
                    </div>
                </div>

                <div className="wrapper-inner-container" id="landing-container-right">
                    Some cool svg art animation wil go here
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Landing);