import { applyMiddleware, createStore } from 'redux';

import { browserHistory } from 'react-router';
import logger from 'redux-logger';
import reducer from '../reducers/';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

//import DevTools from '../containers/DevTools';

const enableHotLoader = (store: any) => {
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
};

const reduxRouterMiddleware = routerMiddleware(browserHistory as any);
declare var window : any;

const store = createStore(
 reducer,
 applyMiddleware(thunk , reduxRouterMiddleware, logger as any, routerMiddleware(browserHistory as any)),
  window.devToolsExtension ? window.devToolsExtension() : undefined)

enableHotLoader(store);

export default store;
