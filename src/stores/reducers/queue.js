import { createReducer } from 'redux-act';
import {
    setQueue,
} from '../actions';

const initialState = {
    queue: null,
}

export default createReducer({
    [setQueue]: (state, payload) => Object.assign({ queue: payload}),
}, initialState);
