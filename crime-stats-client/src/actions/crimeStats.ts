import {
RECEIVE_CRIMEDATA_REQUEST,
BEGIN_FETCH,
END_FETCH
} from '../constants';

import {createAction } from 'redux-actions';
import {arrayOfReportedCrime} from '../schemas';
import {normalize} from 'normalizr';

import {ReportedCrimesApiFp as api} from '../services/api';
import * as fetch from 'isomorphic-fetch';

export const beginFetch = createAction(
    BEGIN_FETCH);

export const endFetch = createAction(
    END_FETCH);

export const receiveDataRequest = createAction<EntityPayload>(
    RECEIVE_CRIMEDATA_REQUEST, (crimes) => ({
        entities: crimes.entities
    }));

export const fetchCrimeData = () => {
    return (dispatch : any, getState : any) => {
        dispatch(beginFetch());        
        return api.reportedCrimesGetReportedCrimes1({$Top: 10})(fetch, 'http://localhost:54054').then((response)=>{
            dispatch(receiveDataRequest(normalize(response.value, arrayOfReportedCrime)));
            dispatch(endFetch());
        }).catch((e) => {
            dispatch(receiveDataRequest([]));    
            dispatch(endFetch());
        });
    };
};