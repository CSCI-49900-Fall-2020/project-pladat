import { createStore, compose , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index.js';



let socket = {
    fake: null
};

let employers = {
    fake: null
};

let recruiters = {
    fake: null
};

let students = {
    fake: null
};

let jobs = {
    fake: null
};

let user = {
    isLoading: false,
    verifyingAuth: false,
    loggingInUser: false,
    loggedIn: false,
    hashedToStore: false,
    hashingToLocalStorage: false,
    removingFromLocalStorage: false,
    awaitingEmailVerification: false,
    isAuthenticated: false,
    userLoginVerified: false,
    userLoginVerificationFail: false,
    emailIsValidated: false,
    user: null,
    preliminaryInfo: null,
    authMessage: null,
    authError: [],
    errorsDidChange: false,
    authState: null,
    serverStatus: null
};

const defaultState = {
    // jobs,
    // employers,
    // recruiters,
    user,
    // students,
    // socket
};


const middleware = [thunk];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(...middleware)));


if(module.hot) {
    module.hot.accept('./reducers/',() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
}


export default store;