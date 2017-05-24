import { applyMiddleware, createStore, compose } from 'redux';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import logger from 'redux-logger';
import reducer from '../reducers/';
import thunk from 'redux-thunk';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

const enableHotLoader = (store: any) => {

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
};

declare var window : any;

export default configureStore();

export function configureStore() { 

        // Needed for onTouchTap
        // http://stackoverflow.com/a/34015469/988941
        injectTapEventPlugin();    

        const finalCreateStore = compose(
            applyMiddleware(thunk),
            applyMiddleware(logger as any),
        )(createStore); 

    const store = finalCreateStore(reducer,
     window.devToolsExtension ? window.devToolsExtension() : undefined ) as Redux.Store<RootState>;

    syncHistoryWithStore(browserHistory as any, { ...store });

    enableHotLoader(store);

    return store;
}