import * as React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});
class App extends React.Component<{}, null> {
  handleTouchTap = () => {
      console.log('touched');
    }
  render() {
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>Material-UI</h1>
          <h2>example project</h2>
          <RaisedButton
            label="Super Secret Password"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
