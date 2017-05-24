import * as React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import * as Actions from '../actions/crimeStats';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {values} from 'lodash'
import {ReportedCrime} from '../services/api';

import './App.css';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};




const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


interface AppProps {
    crimes: ReportedCrime[];
    actions: any;
};

class App extends React.Component<AppProps, any> {
   constructor(props : any, context : any) {
        super(props, context);
    }

  handleTouchTap = () => {
      this.props.actions.fetchCrimeData();
    }
  render() {
    const {crimes} = this.props;
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

          <GridList cols={2.2} style={styles.gridList as any}>
              {crimes.map((c) => (
                <GridTile
                  key={c.id}
                  title={c.lsoaName}
                  actionIcon={<IconButton><StarBorder color="rgb(30, 3, 212)" /></IconButton>}
                  subtitle={c.fallsWithin}
                  style={styles.titleStyle}
                  titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                >
                </GridTile>
              ))}
            </GridList>

        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state: RootState) {
    return {
        crimes: values(state.entities.reportedCrimes)
    };
}

function mapDispatchToProps(dispatch : any) {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

