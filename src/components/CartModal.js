import React, { Component } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import CartContext from '../contexts/cart';

class CartModal extends Component {
    render() {
        const { open, onClose } = this.props;
        return (
            <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cart!!</DialogTitle>
                <CartContext.Consumer>
                    {context => 
                            context.cart.map(item => {
                                return (
                                    <DialogContent key={item.id}>
                                        {item.name} - {item.amount}
                                    </DialogContent>
                                )

                            })
                    }
                </CartContext.Consumer>
            </Dialog>
        )
    }
}

export default CartModal;

/*
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

export default withStyles(styles)(CartModal);
*/
