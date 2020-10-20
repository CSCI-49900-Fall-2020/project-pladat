import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as allUserActions from '../actions/userActions';
// import * as allStudentActions from '../actions/studentActions';


import Main from './Main';

function mapStateToProps(state) {
    return {
        //state goes here
    }
}

// eg: const actionCreators = {...allStudentActions};

function mapDispatchToProps(dispatch) {
    // return bindActionCreators(actionCreators, dispatch);
}



const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;