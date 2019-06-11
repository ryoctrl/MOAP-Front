import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogContent, DialogTitle, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';

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
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const cart = this.cart;

        return fetch(OrderEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({cart})
        }).then((res) => {
            console.log('POST SUCCESS');
            console.log(res);
        }).catch((err) => {
            console.log('POST ERROR!');
            console.log(err);
        });

    }

    render() {
        const { classes, open, onClose, cart } = this.props;
        this.cart = cart;

        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
                <DialogTitle id="form-dialog-title">ShoppingCart</DialogTitle>
                <List>
        { cart.map(item => {
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
        <Button onClick={this.submitOrder} variant="contained" className={classes.button}>
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
