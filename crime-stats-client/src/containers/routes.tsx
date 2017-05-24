import * as React from 'react';

import { Route, Router, browserHistory } from 'react-router';

import App from './App';
import store from '../store';
import { syncHistoryWithStore } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory as any, store);

export default function Routes(props : any) {
  return (
    <Router history={history as any}>
      <Route path="/" component={App}/>
    </Router>
  );
}
