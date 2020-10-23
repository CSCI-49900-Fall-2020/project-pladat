import React from 'react';
import { render } from 'react-dom';

import App from  './components/App';

import WaveyText from './components/WaveyText';

import Main2 from './components/Main2';


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
                  <Route exact path="/" component={WaveyText}></Route>
                  <Route exact path= "/test"> <div> Test </div> </Route>
              </Switch>
          </Route>

        </BrowserRouter>
    </Provider>
)

render(router, document.getElementById('root'));