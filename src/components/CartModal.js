import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Dialog, DialogContent, DialogTitle, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import {
    postOrder,
    closeCart,
    performPayment
} from '../stores/actions';

import DateHelper from '../helpers/DateHelper';

import ORDER_TYPES from '../constants/orderType';

const API_HOST = process.env.REACT_APP_API_HOST;
const IMAGE_PATH = API_HOST + 'images/';


class CartModal extends Component {
    closeModal() {
        this.props.dispatch(closeCart());
    }

    submitOrder() {
        this.props.dispatch(postOrder());
    }

    performPayment() {
        const { order, dispatch } = this.props;
        dispatch(performPayment(order.order));
    }

    getTitle() {
        const { order } = this.props;
        switch(order.orderState) {
            case ORDER_TYPES.ORDER:
                return 'ShoppingCart';
            case ORDER_TYPES.PAYMENT:
                return 'Payment';
            case ORDER_TYPES.PAYMENTED:
                return 'Thank you!';
            default:
                return 'ShoppingCart';
        }
    }

    renderOrderContent() {
        const { classes, cart, menu } = this.props;
        const cartList = cart.list.map(cartMenu => {
            const cartMenuObj = menu.list.filter(m => m.id === cartMenu.id);
            return Object.assign({}, cartMenu, cartMenuObj[0]);
        });

        return (
            <div>
                <List>
                    {cartList.length === 0 && <Typography>商品をカートに入れてください</Typography>}
                    { cartList.map(item => {
                        let img;
                        if(!item.image) img = '/img/no-image.svg';
                        else img = IMAGE_PATH + item.image;
                        return (
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={img} className={classes.avatar}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={item.amount} />
                            </ListItem>
                        )
                    })}
                </List>
                <Button onClick={this.submitOrder.bind(this)}  className={classes.button}>
                    Order
                </Button>
            </div>
        )
    }

    renderPaymentContent() {
        const { classes, order } = this.props;
        return (
            <div>
                <Typography>{order.order.total_price}</Typography>
                <Button onClick={this.performPayment.bind(this)} className={classes.button}>
                    Payment
                </Button>
            </div>
        )
    }

    renderPaymentedContent() {
        const { classes, order } = this.props;
        const getRequiredMinutes = menuItem => menuItem.Menu.required_time * menuItem.amount;
        const requiredMinutes = order.order.OrderItems.map(getRequiredMinutes);
        const requiredMinute = Math.max(requiredMinutes);
        const handedTime = new DateHelper().getAfter('minutes', requiredMinute);
        return (
            <div>
                <Typography>{requiredMinutes}分後に完成予定です！</Typography>
                <Typography>{handedTime}を目安に受け取りに来てください!</Typography>
                <Typography>注文ID: {order.order.id}</Typography>
                <Button onClick={this.closeModal.bind(this)} className={classes.button}>
                    Close
                </Button>
            </div>
        )
    }

    renderContent() {
        const { order } = this.props;
        switch(order.orderState) {
            case ORDER_TYPES.ORDER:
                return this.renderOrderContent();
            case ORDER_TYPES.PAYMENT:
                return this.renderPaymentContent();
            case ORDER_TYPES.PAYMENTED:
                return this.renderPaymentedContent();
            default:
                return this.renderOrderContent();
        }
    }

    render() {
        const { classes, open, onClose, dispatch, cart, menu } = this.props;

        return (
            <Dialog 
                open={cart.isOpen} 
                onClose={this.closeModal.bind(this)} 
                aria-labelledby="form-dialog-title" 
                className={classes.dialog}>
                <DialogTitle id="form-dialog-title">{this.getTitle()}</DialogTitle>
                {this.renderContent()}
            </Dialog>
        );
    }
}

const styles = theme => ({
    avatar: {
        display: 'inline-block',
        width: 40,
        height: 40
    },
    info: {
        lineHeight: '40px',
    },
    button: {
        marign: theme.spacing.unit,
    }
});

CartModal = connect(s => s)(CartModal);
CartModal = withStyles(styles)(CartModal);
export default CartModal;
