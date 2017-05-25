import * as fetch from 'isomorphic-fetch';

import {
BEGIN_FETCH,
END_FETCH,
RECEIVE_CRIMEDATA_REQUEST,
} from '../constants';

import {ReportedCrimesApiFp as api} from '../services/api';
import {arrayOfReportedCrime} from '../schemas';
import {createAction} from 'redux-actions';
import {normalize} from 'normalizr';

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
        return api.reportedCrimesGetReportedCrimes1({$top: 100})(fetch, 'http://localhost:54054').then((response)=>{
            dispatch(receiveDataRequest(normalize(response.value, arrayOfReportedCrime)));
            dispatch(endFetch());
        }).catch((e) => {
            dispatch(receiveDataRequest([]));    
            dispatch(endFetch());
        });
    };
};