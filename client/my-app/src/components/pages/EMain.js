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



import './styles/Base.css';
import './styles/MainBase.css';
import './styles/EMain.css';

class EMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentUser: null,
            loadingJobs: false
        }
    }

    render() {
        return (
            <div className='page-wrapper' id='EMain-wrapper'>
                {
                    this.state.loadingJobs || this.state.loadingUser?

                    <div className='main-loader-div'>
                        <h1 className='text'>Getting things ready for you</h1>

                        <ViewLoader />
                    </div>

                    :

                    <MainWrapper location={this.props.location} match={this.props.match}>
                        <div className='inner-gridWrapper' id='EMain-inner-girdWrapper'>
                            <div className="inner-gridContainer">
                                <div className='grid-left-sidebar'>
                                    <div className='grid-left-nameHolder'>
                                        <h1>{}</h1>
                                    </div>
                                    <div className='grid-left-contentHolder'>

                                    </div>
                                </div>
                                <div className='grid-top-title'>Title bar</div>
                                <div className='grid-center-main'>
                                    Main centre view
                                        <Switch>
                                        <Route exact path = '/e' component={DiscoverView}/>
                                        <Route exact path='/e/discover/' component={DiscoverView} />
                                        <Route exact path='/e/discover/:id' component={null} />
                                        <Route exact path='/e/me' component={ProfileEdit} />
                                        <Route exact path='/e/me/preview_profile' component={Preview} />
                                        <Route exact path='/e/settings' component={Settings}/>
                                        <Route component={FourOFour} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </MainWrapper>
                }
            </div>
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
  
  
export default connect(mapStateToProps, mapDispatchToProps)(EMain);