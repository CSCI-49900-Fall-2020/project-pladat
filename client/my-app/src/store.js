import { createStore, compose , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index.js';



let socket = {
};

let employers = {
};

let recruiters = {
};

let students = {
};

let jobs = {
};

let user = {
};

const defaultState = {
    jobs,
    employers,
    recruiters,
    user,
    students,
    socket
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