import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from '../../redux';
import Wellcome from '../wellcome';
import Details from '../details';
import { appHistory } from '../../history.js';


export const App = () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/">
        <Wellcome />
      </Route>
      <Route path="/profile">
        <Details />
      </Route>
    </Router>
  </Provider>
);
