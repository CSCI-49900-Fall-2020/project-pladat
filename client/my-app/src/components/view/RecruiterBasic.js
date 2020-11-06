import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';


import './styles/RecruiterBasic.css';
import './styles/Base.css';


class RecruiterBasic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="basicInfo-form-wrapper" id="basicInfo-recruiter-form-wrapper">
                <div className="basicInfo-form-title-container" id="basicInfo-recruiter-form-title-container">
                    <h1 className="text baseInfo-title-txt" id="basicInfo-recruiter-form-title"><span>Place<span>Mint</span> - </span>Recruiter</h1>
                </div>

                <div className="baseInfo-form-container">
                    <div className="basicInfo-form-inner-left">
                        <form></form>
                    </div>

                    <div className="basicInfo-form-inner-right">
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterBasic);