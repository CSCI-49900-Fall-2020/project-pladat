import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';


import BasicViewWrapper from './BasicViewWrapper';


import './styles/StudentBasic.css';
import './styles/Base.css';


class StudentBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.user.user.firstname+ " " + this.props.user.user.lastname,
            majors: [],
            major: "",
            gradDate: "",
            shortDesc: null,
            skills: null,
            universities: [],
            university: ""
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <BasicViewWrapper route={this.props.match.path}>
                <div className="basicInfo-form-wrapper" id="basicInfo-student-form-wrapper">

                    <div className="basicInfo-form-title-container" id="basicInfo-student-form-title-container">
                        <h1 className="text baseInfo-title-txt" id="basicInfo-student-form-title"><span>Place<span>Mint</span> - </span>Student <span className="basicInfo-form-userName">{this.state.userName}</span></h1>
                    </div>

                    <div className="baseInfo-form-container">
                        <div className="basicInfo-form-inner-left">
                            <form>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-unis">
                                    <label htmlFor="uniInput" className="text basicInfo-from-inputLabel">What university/universities have you attended.</label>
                                    <input value={this.state.university} name="uniInput" className="basicInfo-form-input" placeholder="univerity/college"/>
                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-gradDate">
                                    <label htmlFor="dateInput" className="text basicInfo-from-inputLabel">Graduation date</label>
                                    <input value={this.state.gradDate} name="dateInput" className="basicInfo-form-input" placeholder="mm-dd-yy"/>
                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-majors">
                                    <label htmlFor="majorInput" className="text basicInfo-from-inputLabel">What are you studying?</label>
                                    <input value={this.state.major} name="majorInput" className="basicInfo-form-input" placeholder="subjects"/>
                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-shortDesc">
                                    <textarea cols="92" rows="10" value={this.state.shortDesc} name="majorInput" className="basicInfo-form-input" placeholder="Tell us about yourself; keep it short and concise."></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="basicInfo-form-inner-right">
                        </div>
                    </div>

                </div>
            </BasicViewWrapper>
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(StudentBasic);