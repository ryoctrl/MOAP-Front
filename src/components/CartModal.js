import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Dialog, DialogContent, DialogTitle, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import {
    postOrder,
    closeCart,
} from '../stores/actions';

const API_HOST = process.env.REACT_APP_API_HOST;
const IMAGE_PATH = API_HOST + 'images/';
const OrderEndpoint = API_HOST + 'api/orders/create';


class CartModal extends Component {
    constructor(props) {
        super(props);
        this.cart = props.cart;
        this.submitOrder = this.submitOrder.bind(this);
    }

    submitOrder() {
        this.props.onClose();
        this.props.dispatch(postOrder());
    }

    render() {
        const { classes, open, onClose, dispatch, cart, menu } = this.props;
        const cartList = cart.list.map(cartMenu => {
            const cartMenuObj = menu.list.filter(m => m.id === cartMenu.id);
            return Object.assign({}, cartMenu, cartMenuObj[0]);
        });
        this.cart = cart;

        return (
            <Dialog open={cart.isOpen} onClose={() => dispatch(closeCart())} aria-labelledby="form-dialog-title" className={classes.dialog}>
                <DialogTitle id="form-dialog-title">ShoppingCart</DialogTitle>
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
                <Button onClick={this.submitOrder}  className={classes.button}>
                    Order
                </Button>
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
