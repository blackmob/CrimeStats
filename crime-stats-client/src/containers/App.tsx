import './App.css';

import * as Actions from '../actions/crimeStats';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {ReportedCrime} from '../services/api';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {values} from 'lodash'

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
          <RaisedButton
            label="Fetch Crime Data"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
        <Table >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Month</TableHeaderColumn>
                <TableHeaderColumn>Reported By</TableHeaderColumn>
                <TableHeaderColumn>Falls Within</TableHeaderColumn>
                <TableHeaderColumn>Location</TableHeaderColumn>
                <TableHeaderColumn>Crime Type</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crimes.map(c=>
                  <TableRow>
                    <TableRowColumn>{c.month}</TableRowColumn>
                    <TableRowColumn style={styles.titleStyle}>{c.reportedBy}</TableRowColumn>
                    <TableRowColumn>{c.fallsWithin}</TableRowColumn>
                    <TableRowColumn>{c.location}</TableRowColumn>
                    <TableRowColumn >{c.crimetype}</TableRowColumn>
                  </TableRow>
              )}
            </TableBody>
          </Table>
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

