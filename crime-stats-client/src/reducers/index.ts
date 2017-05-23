const routerReducer = require('react-router-redux').routerReducer;
import { combineReducers } from 'redux';
import entities from './entities';

const rootReducer = combineReducers({
    entities: entities,
    routing: routerReducer,
});

export default rootReducer;