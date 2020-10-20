import { createStore, compose , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';



let jobs = {
};

let employers = {
};

let recruiters = {
};

const defaultState = {
    jobs,
    employers,
    recruiters
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