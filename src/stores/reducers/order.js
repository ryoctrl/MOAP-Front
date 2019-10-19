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
        console.log(payload);
        const newState = Object.assign({}, state);
        newState.orderState = ORDER_TYPES.PAYMENTED;
        const { handed_at: handedAt } = payload.data;
        console.log('response is ');
        console.log(handedAt);
        const handedAtMoment = new DateHelper(handedAt, 'moment');
        console.log(handedAtMoment);
        newState.requiredMinute = handedAtMoment.getDiffFromNow('minutes');
        newState.handedTime = handedAtMoment.date.format('HH:mm:ss');
        console.log(newState);
        /*
        const getRequiredMinutes = menuItem => menuItem.Menu.required_time;
        const requiredMinutes = newState.order.OrderItems.map(getRequiredMinutes);
        const requiredMinute = Math.max(requiredMinutes);
        newState.requiredMinute = requiredMinute;
        newState.handedTime = new DateHelper().getAfter('minutes', requiredMinute);
        console.log(newState);
        */
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
        if(state.orderState === ORDER_TYPES.PAYMENTED) {
            return {
                orderStage: ORDER_TYPES.ORDER,
                order: null,
                handedTime: null,
                requiredMinute: null,
                isPaymented: false,
            }
        }
        newState.orderState = ORDER_TYPES.ORDER;
        return newState;
    },
    [resetOrder]: (state, payload) => {
        return initialState;
    }
}, initialState);


