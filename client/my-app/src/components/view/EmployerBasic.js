import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

import BasicViewWrapper from './BasicViewWrapper';


import './styles/StudentBasic.css';
import './styles/Base.css';
import './styles/Media.css';



class EmployerBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.user.user.firstname+ " " + this.props.user.user.lastname
        }
    }

    render() {
        return (
            <BasicViewWrapper route={this.props.match.path}>
                <div className="basicInfo-form-wrapper" id="basicInfo-employer-form-wrapper">
                    <div className="basicInfo-form-title-container" id="basicInfo-employer-form-title-container">
                        <h1 className="text baseInfo-title-txt" id="basicInfo-employer-form-title"><span>Place<span>Mint</span> - </span>Employer <span className="basicInfo-form-userName">{this.state.userName}</span></h1>
                    </div>

                    <div className="baseInfo-form-container">
                        <div className="basicInfo-form-inner-left">
                            <form></form>
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(EmployerBasic);