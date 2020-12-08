import React from 'react';

import './styles/Preview.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';
import * as allStudentActions from '../../actions/StudentActions';
import * as allRecruiterActions from '../../actions/RecruiterActions';
import * as allEmployerActions from '../../actions/EmployerActions';


class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="Preview-wrapper">

            <div className="card-wrapper">
                <div className="card">
                    <img className="card-picture" id="card-pic" style={{ backgroundImage: `url(https://i.ytimg.com/vi/weOF9_FGjOk/maxresdefault.jpg)` }}></img>
                    <h1>
                        {this.props.user.user.firstname} {this.props.user.user.lastname}
                        <br></br>
                    </h1>
                    <h2>
                        {this.props.user.user.major.map((major, index) => (
                            <p>Studies {major}</p>
                        ))}
                        {this.props.user.user.university.map((uni, index) => (
                            <p>{uni}</p>
                        ))}
                        <br></br>
                    </h2>
                    <h5 className="card-heading"> About {this.props.user.user.firstname} <br></br></h5>
                    <h6 className="card-text">                         
                        {this.props.user.user.shortDesc}
                        <br></br>
                        <br></br>
                        Personality Traits: {this.props.user.user.values.personality.map((trait, index) => (
                            <h>{trait}, </h>
                        ))}
                        <br></br>
                        <br></br>
                        Skills: {this.props.user.user.skills.map((skill, index) => (
                            <h>{skill}, </h>
                        ))}
                        <br></br>
                        <br></br>
                        Interested In: {this.props.user.user.values.industry.map((ind, index) => (
                            <h>{ind}, </h>

                        ))}
                        <br></br>
                        <br></br>  
                    </h6>
                    <h3 className="card-heading"> More Info <br></br></h3>
                    <h4 className="card-text">
                        Graduating on {this.props.user.user.graduationDate}
                        <br></br>
                        <br></br>
                        General Experience: {this.props.user.user.generalExperience.map((exp, index) => (
                            <h>{exp}, </h>
                        ))}
                        <br></br>
                        <br></br>
                        Preferred Roles: {this.props.user.user.preferredRoles.map((role, index) => (
                            <h>{role}, </h>
                        ))}
                        <br></br>
                        <br></br>
                        Values Most in a Company: {this.props.user.user.values.compVals.map((cval, index) => (
                            <h>{cval}, </h>
                        ))}
                        <br></br>
                        <br></br>
                        Interested in Companies That Are: {this.props.user.user.values.compStage.map((stage, index) => (
                            <h>{stage}, </h>
                        ))}
                        <br></br>
                        <br></br>
                        Preferred Work Environment: {this.props.user.user.values.workEnv.map((env, index) => (
                            <h>{env}, </h>
                        ))}
                        <br></br>
                        <br></br>                      
                        Link to Resume: {this.props.user.user.resume}
                        <br></br>
                        <br></br>
                    </h4>
               </div>
            </div>

            <div className="buttons-container">
                <button className="like_button">
                <svg xmlns="http://www.w3.org/2000/svg" height="4vh" viewBox="0 0 512 512" width="4vw" className="svg-icon">
                    <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
			c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
			c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
			s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
			C512,93.417,453.532,30,376,30z" fill= "#00a68a"/>
                    </svg>
                </button>
                <button className="dislike_button">
                <svg xmlns="http://www.w3.org/2000/svg" height="4vh" viewBox="0 0 512 512" width="4vw" className="svg-icon">
                <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
			c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
			c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
			L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
			c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
			c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
			c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z" fill= "#00a68a"/>
                    </svg>
                </button>
            </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        recruiters: state.recruiters,
        employers: state.employers,
        students: state.students
    }
}
        
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            userActions: bindActionCreators(allUserActions, dispatch),
            recruiterActions: bindActionCreators(allRecruiterActions, dispatch),
            employerActions: bindActionCreators(allEmployerActions, dispatch),
            studentActions: bindActionCreators(allStudentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);

