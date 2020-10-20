import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AllStudentActions from '../actions/StudentActions';
import * as AllEmployerActions from '../actions/EmployerActions';
import * as AllRecruiterActions from '../actions/RecruiterActions';
import * as AllUserActions from '../actions/UserActions';
import * as AllSocketActions from '../actions/SocketActions';

import Main from './Main';

function mapStateToProps(state) {
    return {
        //state goes here
    }
}


function mapDispatchToProps(dispatch) {
    // return bindActionCreators(actionCreators, dispatch);
    return;
}



const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;