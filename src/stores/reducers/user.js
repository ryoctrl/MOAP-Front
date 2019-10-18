import { createReducer, createAction } from 'redux-act';
import { SEX_TYPE } from '../../constants/user';
import { 
    setRemain,
    setPaymentInfo
} from '../actions';

const SET_SEX = 'SET_SEX';
export const setSex = createAction(SET_SEX);

const SET_PRIVATE_KEY = 'SET_PRIVATE_KEY';
export const setPrivateKey = createAction(SET_PRIVATE_KEY);

const SET_USER_INFO = 'SET_USER_INFO';
export const setUserInfo = createAction(SET_USER_INFO);

const initialState = {
    initialized: false,
    privateKey: '',
    sex: SEX_TYPE.NONE,
    remain: -1,
    remainStr: '-1',
    mosaic: '',
    storeAddress: '',
    storePublicKey: '',
}

export default createReducer({
    [setSex]: (state, sex) => Object.assign({}, state, { sex, initialized: !!state.privateKey}),
    [setPrivateKey]: (state, privateKey) => Object.assign({}, state, { privateKey, initialized: !!state.sex}),
    [setUserInfo]: (state, payload) => Object.assign({}, state, payload, {initialized: true}),
    [setPaymentInfo]: (state, payload) => Object.assign({}, state, payload),
    [setRemain]: (state, payload) => {
        if(state.remain === payload.remain) return state;
        const newState = Object.assign({}, state, payload);
        newState.remainStr = newState.remain.toString().split('').reverse().join('').match(/(.{1,3})/g).join(',').split('').reverse().join('');
        console.log(newState.remain);
        console.log(newState.remainStr);
        return newState;
    }
}, initialState);
