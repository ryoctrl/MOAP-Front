import { createReducer } from 'redux-act';
import {
    performPayment,
    successPostOrder,
    successPerformPayment,
    failurePerformPayment,
    interruptOrder,
    resetOrder,
} from '../actions';
import ORDER_TYPES from '../../constants/orderType';
import DateHelper from '../../helpers/DateHelper';

const initialState = {
    orderStage: ORDER_TYPES.ORDER,
    order: null,
    handedTime: null,
    requiredMinute: null,
    isPaymented: false,
};

export default createReducer({
    [performPayment]: (state, payload) => {
        return state;
    },
    [successPerformPayment]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.orderState = ORDER_TYPES.PAYMENTED;
        const getRequiredMinutes = menuItem => menuItem.Menu.required_time;
        const requiredMinutes = newState.order.OrderItems.map(getRequiredMinutes);
        const requiredMinute = Math.max(requiredMinutes);
        newState.requiredMinute = requiredMinute;
        newState.handedTime = new DateHelper().getAfter('minutes', requiredMinute);
        return newState;
    },
    [failurePerformPayment]: (state, payload) => {
        return state;
    },
    [successPostOrder]: (state, payload) => {
        console.log('success postorder!');
        const newState = Object.assign({}, state);
        newState.order = payload.data;
        newState.orderState = ORDER_TYPES.PAYMENT;
        return newState;
    },
    [interruptOrder]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.orderState = ORDER_TYPES.ORDER;
        return newState;
    },
    [resetOrder]: (state, payload) => {
        return initialState;
    }
}, initialState);


