import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Dialog, DialogContent, DialogTitle, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import {
    performPayment,
    closeCart
} from '../stores/actions';

const API_HOST = process.env.REACT_APP_API_HOST;
const IMAGE_PATH = API_HOST + 'images/';

class PaymentModal extends Component {
    constructor(props) {
        super(props);
        this.cart = props.cart;
        this.submitOrder = this.submitOrder.bind(this);
    }

    submitOrder() {
        this.props.dispatch(postOrder());
    }

    closeCart() {
        this.props.dispatch(closeCart());
    }

    render() {
        const { classes, dispatch, cart, order } = this.props;

        console.log(order);

        return (
            <Dialog open={cart.isOpen}
                onClose={this.closeCart.bind(this)}
                aria-labelledby="form-dialog-title"
                className={classes.dialog}>
                <DialogTitle id="form-dialog-title">Payment</DialogTitle>
            </Dialog>
        )
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

PaymentModal = connect(s => s)(PaymentModal);
PaymentModal = withStyles(styles)(PaymentModal);
export default PaymentModal;
