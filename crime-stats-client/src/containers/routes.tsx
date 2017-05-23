import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import store from '../store';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';

const history = syncHistoryWithStore(browserHistory as any, store);

export default function Routes(props : any) {
  return (
    <Router history={history as any}>
      <Route path="/" component={App}/>
    </Router>
  );
}
