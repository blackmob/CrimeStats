import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './containers/routes';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/routes', () => {
    var NextApp = require('./containers/routes').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });
}