import * as React from 'react';


import App from './App';
import store from '../store';

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';

const history = syncHistoryWithStore(browserHistory as any, store);

export default function Routes(props : any) {
  return (
     <Provider store={store}>
    <Router history={history as any}>
      <Route path="/" component={App}/>
    </Router>
    </Provider>
  );
}



