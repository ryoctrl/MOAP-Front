import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';

const IMAGE_PATH = process.env.REACT_APP_API_HOST + 'images/';

class CartModal extends Component {
    render() {
        const { classes, open, onClose, cart } = this.props;

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
    }
});

CartModal = connect(s => s)(CartModal);
CartModal = withStyles(styles)(CartModal);

export default CartModal;
