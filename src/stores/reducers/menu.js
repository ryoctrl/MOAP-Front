import { createReducer } from 'redux-act';
import {
    fetchMenus,
    successFetchMenus,
    failureFetchMenus,
} from '../actions';

const initialState = {
    fetching: false,
    initialized: false,
    list: [],
    error: null,
};

export default createReducer({
    [fetchMenus]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.fetching = true;
        return newState;
    },
    [successFetchMenus]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.list = payload.data;
        newState.fetching = false;
        return newState;
    },
    [failureFetchMenus]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.error = payload.error.response.data;
        newState.fetching = false;
        return newState;
    }
}, initialState);

