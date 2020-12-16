import React from 'react';

import './styles/JobCreate.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';
import * as allEmployerActions from '../../actions/EmployerActions';


class JobCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            locations: [],
            todo: '',
            skillsRequired: [],
            typeOfJob: '',
            industry: [],
            role: '',
            perks: [],
            pay: [],
            companyName: this.props.user.user ? this.props.user.user.companyName : '',
            companyId: this.props.user.user ? this.props.user.user.companyId : '',
            compLogo: this.props.user.user ? this.props.user.user.images[0] : null
        }
    }

    render() {
        return (
            <div id="JobCreate-view">
                <div id='JobCreate-view-innerWrapper'>
                    <div id='JobCreate-view-form-container'>
                        <form>
                            <div className='JobCreate-from-fromGroup'>
                                <input type="text" value={this.state.title} placeholder='Job Tile'/>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <textarea placeholder='Briefly describe this job offer.'>
                                    {this.state.description}
                                </textarea>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>What type of job offer is this?</label>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <textarea placeholder='In detail, as much describe exactly what the student will be ding on this job'>
                                    {this.state.todo}
                                </textarea>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>What skills are required for this job?</label>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>Specific role of this position?</label>
                                <input value={this.state.role} type='text' placeholder="eg: ML engineer, Backend developer, etc.."/>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>Describe the work environment</label>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>What are some benefits of this job opportunity?</label>

                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>What's the pay like?</label>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>Assign a recruiter for this job.</label>
                            </div>

                            <div className='JobCreate-from-fromGroup'>
                                <label>What company locations are you hiring for</label>
                                <input type="text" placeholder='locations' />
                            </div>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        employers: state.employers,
    }
}
        
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            userActions: bindActionCreators(allUserActions, dispatch),
            employerActions: bindActionCreators(allEmployerActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCreate);