import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

import BasicViewWrapper from './BasicViewWrapper';

import { usSchoolNames } from '../../staticData/universites';
import { preferredRoles } from '../../staticData/preferredRoles';
import { experienceArr } from '../../staticData/experience';
import { majorsArr } from '../../staticData/majors';

import './styles/RecruiterBasic.css';
import './styles/Base.css';
import './styles/Media.css';


class RecruiterBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.user.user.firstname+ " " + this.props.user.user.lastname,
            universities: [],
            university: "",
            uniAddError: "",
            uniArrIdx: 0,
            jobTitle: "",
            shortDesc: "",
        }
    }

    componentDidMount() {
        //get all employers
    }

    handleUniChange = (event) => {
        event.preventDefault();

        this.setState({
            university: event.target.value,
            uniAddError: "",
            universities: this.state.universities.length <=1 && this.state.uniArrIdx === 0 ? [event.target.value]: this.state.universities
        })
    }
    handleUniAddMore = (event) => {
        event.preventDefault();

        if(this.state.university.length < 2) {
            if(this.state.universities.length === 2) {
                this.setState({
                    uniAddError: "Can add up to two universities/colleges"
                })
            }
            else {
                this.setState({
                    uniAddError: "Please pick, or enter a university/college"
                })
            }
        }
        else if(this.state.university.length >= 2 && this.state.universities.length === 1) {
            if(this.state.universities.includes(this.state.university)) {
                this.setState({
                    university: "",
                    uniArrIdx: this.state.uniArrIdx+1
                })
            }
            else {
                let unis = this.state.universities;
                unis.push(this.state.university);
                this.setState({
                    universities: unis,
                    university: "",
                    uniArrIdx: this.state.uniArrIdx+1
                })
            }
        }
        else {
            if(this.state.university.length >=2 && this.state.universities.length < 1) {
                this.setState({
                    universities: [this.state.university],
                    university: "",
                    uniAddError: "",
                    uniArrIdx: 1
                })
            }
            else {
                this.setState({
                    uniAddError: "Can add up to two universities/colleges"
                })
            }
        }
    }
    handleUniRemove = (event) => {
        event.preventDefault();
        let id = event.target.id;
        id = Number(id);

        let unis = this.state.universities;
        unis = [...unis.slice(0,id), ...unis.slice(id+1)];
        this.setState({
            universities: unis,
            uniAddError: "",
            uniArrIdx: this.state.uniArrIdx > 0 ? this.state.uniArrIdx-1 : 0
        })
    }

    handleAddJobTitle = (event) => {
        event.preventDefault();

        this.setState({
            jobTitle: event.target.value
        })
    }

    handleShortBioInput = (event) => {
        event.preventDefault();
        this.setState({
            shortDesc: event.target.value
        })
    }

    render() {
        return (
            <BasicViewWrapper route={this.props.match.path}>
                <div className="basicInfo-form-wrapper" id="basicInfo-recruiter-form-wrapper">
                    <div className="basicInfo-form-title-container" id="basicInfo-recruiter-form-title-container">
                        <h1 className="text baseInfo-title-txt" id="basicInfo-recruiter-form-title"><span>Place<span>Mint</span> - </span>Recruiter <span className="basicInfo-form-userName">{this.state.userName}</span></h1>
                    </div>

                    <div className="baseInfo-form-container">
                        <div className="basicInfo-form-inner-left">
                            <form>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-unis">
                                    <label htmlFor="uniInput" className="text basicInfo-form-inputLabel">What university/universities have you attended.</label>
                                    <input value={this.state.university} list="school-options" name="uniInput" onChange={this.handleUniChange} className="basicInfo-form-input" placeholder="univerity/college"/>
                                    <span className="basicInfo-input-error">{this.state.uniAddError.length > 0 ? this.state.uniAddError: ""}</span>
                                    <span className="basicInfo-form-addBtn" onClick={this.handleUniAddMore}>Add <span>&#43;</span></span>
                                    <datalist id="school-options">
                                        {
                                            usSchoolNames.map((school, index) => {
                                                return <option value={school} key={"school-"+index}/>
                                            })
                                        }
                                    </datalist>
                                </div>

                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-jobTitle">
                                        <label htmlFor="jobtitle" className="text basicInfo-form-inputLabel">What's your job title</label>
                                        <input list="role-options" name="jobtitle" className="basicInfo-form-input" placeholder="job title"/>
                                        <datalist id="role-options">
                                            {
                                                preferredRoles.map((role, index) => {
                                                    return <option value={role} key={"school-"+index}/>
                                                })
                                            }
                                        </datalist>
                                </div>

                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-companyName">
                                        <label htmlFor="companyName" className="text basicInfo-form-inputLabel">What's company d'you work for?</label>
                                        <input list="company-options" name="companyName" className="basicInfo-form-input" placeholder="company"/>
                                        <span id="basicInfo-form-searchCompanyBtn" className="basicInfo-form-addBtn" onClick={this.handleUniAddMore}>Search <span>&#128269;</span></span>
                                        <datalist id="company-options">
                                            {
                                                preferredRoles.map((role, index) => {
                                                    return <option value={role} key={"school-"+index}/>
                                                })
                                            }
                                        </datalist>
                                </div>

                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-shortDesc">
                                    <textarea maxLength="280" value={this.state.shortDesc} onChange={this.handleShortBioInput} name="majorInput" className="basicInfo-form-input" placeholder="Tell us about yourself; keep it short and concise.">
                                    </textarea>
                                    <span className="baiscInfoShortDesc-charCount">{280-this.state.shortDesc.length}</span>
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterBasic);