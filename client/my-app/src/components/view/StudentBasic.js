import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';


import BasicViewWrapper from './BasicViewWrapper';

import { usSchoolNames } from '../../staticData/universites';
import { preferredRoles } from '../../staticData/preferredRoles';
import { experienceArr } from '../../staticData/experience';
import { majorsArr } from '../../staticData/majors';


import './styles/StudentBasic.css';
import './styles/Base.css';



class StudentBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.user.user.firstname+ " " + this.props.user.user.lastname,
            majors: [],
            major: "",
            majorAddError: "",
            gradDate: "",
            dateError: "",
            shortDesc: null,
            universities: [],
            university: "",
            uniAddError: "",
            roles: [],
            role: "",
            genExperience: [],
            experience: ""
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    handleUniChange = (event) => {
        event.preventDefault();

        this.setState({
            university: event.target.value,
            uniAddError: ""
        })
    }
    handleUniAddMore = (event) => {
        event.preventDefault();

        if(this.state.university.length < 2) {
            if(this.state.universities.length == 2) {
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
        else if(this.state.university.length >= 2 && this.state.universities.length === 0) {
            this.setState({
                universities: [this.state.university],
                university: ""
            })
        }
        else if(this.state.university.length >= 2 && (this.state.universities.length > 0 && this.state.universities.length < 2) && !this.state.universities.includes(this.state.university)) {
            let unis = this.state.universities;
            unis.push(this.state.university);
            this.setState({
                universities: unis,
                university: ""
            })
        }
        else {
            this.setState({
                uniAddError: "Can add up to two universities/colleges"
            })
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
            uniAddError: ""
        })
    }

    handleDateAdd = (event) => {
        event.preventDefault();
        clearTimeout();
        this.setState({
            gradDate: event.target.value
        })
    }
    handleDateValid = (event) => {
        event.preventDefault();
        setTimeout(() => {
            const regex = /^((0[1-9]{1})|(1[0-2]{1}))(\/)([0-9]{4})$/g;
            if(!regex.test(this.state.gradDate)) {
                this.setState({
                    dateError: "Please enter a valid date in mm/yyyy format"
                })
            }
        }, 2000)
    }

    handleMajorInput = (event) => {
        event.preventDefault();
        this.setState({
            major: event.target.value,
            majorAddError: ""
        })
    }
    handleMajorAddMore = (event) => {
        event.preventDefault();

        if(this.state.major.length < 2) {
            if(this.state.majors.length == 2) {
                this.setState({
                    majorAddError: "Can add up to two majors"
                })
            }
            else {
                this.setState({
                    majorAddError: "Please pick, or enter a major"
                })
            }
        }
        else if(this.state.major.length >= 2 && this.state.majors.length === 0) {
            this.setState({
                majors: [this.state.major],
                major: ""
            })
        }
        else if(this.state.major.length >= 2 && (this.state.majors.length > 0 && this.state.majors.length < 2) && !this.state.majors.includes(this.state.major)) {
            let maj = this.state.majors;
            maj.push(this.state.major);
            this.setState({
                majors: maj,
                major: ""
            })
        }
        else {
            this.setState({
                majorAddError: "Can add up to two majors"
            })
        }
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
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-gradDate">
                                    <label htmlFor="dateInput" className="text basicInfo-form-inputLabel">Graduation date</label>
                                    <input type="date" value={this.state.gradDate} name="dateInput" onChange={this.handleDateAdd} className="basicInfo-form-input" placeholder="mm/dd/yy" required/>
                                    <span className="basicInfo-input-error">{this.state.dateError.length > 0 ? this.state.dateError: ""}</span>

                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-majors">
                                    <label htmlFor="majorInput" className="text basicInfo-form-inputLabel">What are you studying?</label>
                                    <input value={this.state.major} onChange={this.handleMajorInput} name="majorInput" list="major-options" className="basicInfo-form-input" placeholder="subjects"/>
                                    <span className="basicInfo-input-error">{this.state.majorAddError.length > 0 ? this.state.majorAddError: ""}</span>
                                    <span className="basicInfo-form-addBtn" onClick={this.handleMajorAddMore}>Add <span>&#43;</span></span>
                                    <datalist id="major-options">
                                        {
                                            majorsArr.map((major, index) => {
                                                return <option value={major} key={"major-"+index}/>
                                            })
                                        }
                                    </datalist>
                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-background">
                                    <label htmlFor="backgroundInput" className="text basicInfo-form-inputLabel">What's your background experience?</label>
                                    <fieldset name="backgroundInput" className="basicInfo-form-optionsBox" id="basicInfo-form-backgroundChoicesContainer">
                                        {
                                            experienceArr.map((background, index) => {
                                                return <div className="experienceSlot" key={"expSlot-"+index}>
                                                    <span className="experienceSlot-type">{background}</span>
                                                </div>
                                            })
                                        }
                                    </fieldset>
                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-preferred">
                                    <label htmlFor="preferred" className="text basicInfo-form-inputLabel">What's your preferred work role?</label>
                                    <fieldset name="preferred" className="basicInfo-form-optionsBox" id="basicInfo-form-preferredRolesContainer">
                                        {
                                            preferredRoles.map((role, index) => {
                                                return <div className="roleSlot" key={"roleSlot-"+index}>
                                                    <span className="roleSlot-type">{role}</span>
                                                </div>
                                            })
                                        }
                                    </fieldset>
                                </div>
                                <div className="basicInfo-form-inputContainer" id="basicInfo-form-shortDesc">
                                    <textarea cols="92" rows="10" value={this.state.shortDesc} name="majorInput" className="basicInfo-form-input" placeholder="Tell us about yourself; keep it short and concise."></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="basicInfo-form-inner-right">
                            {
                                this.state.universities.length > 0 ?
                                <div className="basicInfo-form-inner-right-elem-container" id="basicInfo-form-inner-right-unis">
                                    <label>You've attended: </label>
                                    {this.state.universities.map((uni, idx) => {
                                        return <span className="basicInfo-form-right-slot" key={idx} id={idx+""}>
                                            {uni}  <span onClick={this.handleUniRemove} title="Remove" className="basicInfo-form-right-slotRemoveBtn">&#10006;</span>
                                        </span>
                                    })}
                                </div> 
                                : ""
                            }
                            
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