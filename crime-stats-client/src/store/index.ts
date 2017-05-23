import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers/';
//import DevTools from '../containers/DevTools';

const enableHotLoader = (store: any) => {
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
};

const initialState = {};

const reduxRouterMiddleware = routerMiddleware(browserHistory as any);

const createStoreWithMiddleware = compose(
  applyMiddleware( thunk , reduxRouterMiddleware, logger as any, routerMiddleware(browserHistory as any))
)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);

enableHotLoader(store);

export default store;
