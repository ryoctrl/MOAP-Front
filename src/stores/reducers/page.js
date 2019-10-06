import { createReducer } from 'redux-act';
import {
    changePage,
    toggleDrawer
} from '../actions';

const initialState = {
    name: 'TOP',
    drawerOpen: false
}

export default createReducer({
    [changePage]: (state, payload) => Object.assign({}, state, {name: payload}),
    [toggleDrawer]: state => Object.assign({}, state, { drawerOpen: !state.drawerOpen}),
}, initialState);
