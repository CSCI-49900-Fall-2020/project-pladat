import React from 'react';
import { render } from 'react-dom';

import App from  './components/App';


// import pages components



// router dependencies
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';





const router = (
    <Provider store={store}>
        <BrowserRouter>
                <Switch>
                  <Route path="/" component={App}>
                    <div>
                      Component
                    </div>
                  </Route>
                </Switch>
        </BrowserRouter>
    </Provider>
)

render(router, document.getElementById('root'));