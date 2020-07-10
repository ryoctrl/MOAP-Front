import { createReducer } from 'redux-act';
import {
    fetchHistory,
    fetchHistorySuccess,
    fetchHistoryFailure,
} from '../actions';

const initialState = {
    orders: [],
};

export default createReducer({
    [fetchHistory]: (state, payload) => {
        return state;
    },
    [fetchHistorySuccess]: (state, orders) => {
        return Object.assign({}, state, { orders });
    },
    [fetchHistoryFailure]: (state, payload) => {
        return { orders: [] };
    },
}, initialState);


