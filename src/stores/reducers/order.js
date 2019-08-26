import { createReducer } from 'redux-act';
import {
    performPayment,
    successPostOrder,
    successPerformPayment,
    failurePerformPayment,
} from '../actions';
import ORDER_TYPES from '../../constants/orderType';

const initialState = {
    orderStage: ORDER_TYPES.ORDER,
    order: null,
    isPaymented: false,
};

export default createReducer({
    [performPayment]: (state, payload) => {
        return state;
    },
    [successPerformPayment]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.orderState = ORDER_TYPES.PAYMENTED;
        return newState;
    },
    [failurePerformPayment]: (state, payload) => {
        return state;
    },
    [successPostOrder]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.order = payload.data;
        newState.orderState = ORDER_TYPES.PAYMENT;
        return newState;
    },
}, initialState);


