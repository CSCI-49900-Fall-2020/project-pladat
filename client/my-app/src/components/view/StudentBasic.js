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
            userName: this.props.user.user.firstname+ " " + this.props.user.user.lastname
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(StudentBasic);