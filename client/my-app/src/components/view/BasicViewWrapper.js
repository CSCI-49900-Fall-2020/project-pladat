import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';

import { Redirect } from 'react-router-dom';

import './styles/Base.css';
import './styles/Media.css';

class BasicViewWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            correctType: null,
            redirectToLogin: false
        }
    }
    componentDidMount() {
        let curUrl = this.props.route;
        let urlSplit = curUrl.split('/');
        let typeFromUrl = urlSplit[1];


        if(!this.props.user.isAuthenticated) {
            this.setState({
                redirectToLogin: true
            })
        }
        else {
            if(this.props.user.user.typeOfUser.toLowerCase() !== typeFromUrl) {
                this.setState({
                    redirect: true,
                    correctType: this.props.user.user.typeOfUser.toLowerCase()
                })
            }
        }

    }


    render() {
        if(this.state.redirect) {
            return <Redirect to={`/${this.state.correctType}/basicInfo`}/>;
        }
        if(this.state.redirectToLogin) {
            return <Redirect to='/login'/>;
        }
        return (
            <div className="BasicViewWrapper">
                {React.cloneElement({...this.props}.children, {...this.props})}
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(BasicViewWrapper);


