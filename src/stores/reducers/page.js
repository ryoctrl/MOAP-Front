import { createReducer } from 'redux-act';
import {
    changePage,
    toggleDrawer,
    setError
} from '../actions';

const initialState = {
    name: 'TOP',
    drawerOpen: false,
    errorMessage: '',
}

export default createReducer({
    [changePage]: (state, payload) => Object.assign({}, state, {name: payload}),
    [toggleDrawer]: state => Object.assign({}, state, { drawerOpen: !state.drawerOpen}),
    [setError]: (state, payload) => Object.assign({}, state, { errorMessage: payload }),
}, initialState);
