import React from 'react';
import { render } from 'react-dom';

import App from  './components/App';


// import pages components
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';



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
                  <Route exact path="/" component={Landing}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/register" component={Register}/>
              </Switch>
          </Route>

        </BrowserRouter>
    </Provider>
)

render(router, document.getElementById('root'));