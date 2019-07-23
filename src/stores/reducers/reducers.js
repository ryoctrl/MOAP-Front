import { combineReducers } from 'redux';
import cart from './cart';
import menu from './menu';
import order from './order';

export default combineReducers({
    menu, cart, order
});
