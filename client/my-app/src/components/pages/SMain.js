import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link, Redirect, Switch, Route } from 'react-router-dom';


import * as allUserActions from '../../actions/UserActions';
import * as allStudentActions from '../../actions/StudentActions';

import MainWrapper from '../pages/MainWrapper';

import ViewLoader from '../uiComponents/ViewLoader';

import ProfileEdit from '../view/ProfileEdit';
import Preview from '../view/Preview';
import Settings from '../view/Settings';
import DiscoverView from '../view/DiscoverView';
import FourOFour from '../pages/FourOFour';

import Header from './Header'
import Cards from './Cards'

import './styles/Base.css';
import './styles/MainBase.css';
import './styles/SMain.css';
import "./styles/MainPage.css"

class SMain extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.user.user) {
            this.props.actions.userActions.verifyUserLogin(this.props.user.user._id);
        }

        this.state = {
            studentUser: this.props.user.user,
            userType: this.props.user.user ? this.props.user.user.typeOfUser : null,
            loadingJobs: false,
            loadingUser: true,
            redirectToLogin: false,
            redirect: false,
            redirectTo: null,
            possibUrlUsrTypes: 'sre'
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            const { loggedIn, isAuthenticated, userLoginVerificationFail, authState, user } = this.props.user;

            if(!isAuthenticated || !user && !this.state.loadingUser) {
                this.setState({ redirectToLogin: true })
            }
            else {
                // setTimeout(() => {
                //     this.setState({
                //         loadingUser: false
                //     })
                // }, 1000)
                this.setState({
                    loadingUser: false
                })
            }
        }
    }

    arrayToString = (arr, startIdx) => {
        if(startIdx > arr.length) {
            return "";
        }
        if(startIdx === arr.length-1) {
            return `/${arr[startIdx]}`;
        }
        let pathCombine = ''; 
        for(let i = startIdx; i < arr.length; i++) {
            pathCombine+=`/${arr[i]}`;
        }
        return pathCombine;
    }

    render() {
        if(this.state.redirectToLogin) {
            return <Redirect to='/login'/>
        }
        if(this.state.redirect) {
            return <Redirect to={this.state.redirectTo}/>
        }
        return (
            <MainWrapper location={this.props.location} match={this.props.match}>

            <div className='page-wrapper' id='SMain-wrapper'>
                {
                    this.state.loadingJobs || this.state.loadingUser?

                    <div className='main-loader-div'>
                        <h1 className='text'>Getting things ready for you</h1>

                        <ViewLoader />
                    </div>

                    :

                        <div className='inner-gridWrapper' id='SMain-inner-girdWrapper'>
                            <div className="inner-gridContainer">
                                <div className='grid-left-sidebar'>
                                    <div className='grid-left-nameHolder'>
                                        <h1>{}</h1>
                                    </div>
                                    <div className='grid-left-contentHolder'>

                                    </div>
                                </div>
                                <div className='main-page-wrapper'>
                                    <Header />
                                    <Cards />
                                        <Switch>
                                        <Route exact path='/s' component={DiscoverView}/>
                                        <Route exact path='/s/discover/' component={DiscoverView} />
                                        <Route exact path='/s/discover/:id' component={null} />
                                        <Route exact path='/s/me' component={ProfileEdit} />
                                        <Route exact path='/s/me/preview_profile' component={Preview} />
                                        <Route exact path='/s/settings' component={Settings}/>
                                        <Route component={FourOFour} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                }
            </div>
            </MainWrapper>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        students: state.students
    }
}
        
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            userActions: bindActionCreators(allUserActions, dispatch),
            studentActions: bindActionCreators(allStudentActions, dispatch)
        }
    };
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(SMain);