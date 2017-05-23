import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './containers/routes';
import registerServiceWorker from './registerServiceWorker';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

renderWithHotReload(Routes);

registerServiceWorker();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/routes', () => {
        const RootElement = require('./containers/routes').Routes;
        renderWithHotReload(RootElement);
    });
}

function renderWithHotReload(RoutesElement : any) {
    ReactDOM.render(
        <Routes/>,
        document.getElementById('root'));
}