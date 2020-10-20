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
                <Route path="/" component={App}>
                    <Switch>
                        {/* All the pages go here, wrapperd in react router 'Route tags' see react router docs */}
                    </Switch>

                </Route>
        </BrowserRouter>
    </Provider>
)

render(router, document.getElementById('root'));