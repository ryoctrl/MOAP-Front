import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { 
    Button, 
    TextField, 
    Typography, 
    Dialog, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from '@material-ui/core';
import { connect } from 'react-redux';
import { 
    addCart,
    subCart
} from '../stores/actions';

class MenuModal extends Component {
    constructor(props) {
        super();
        this.state = {
            amount: 0
        };
    }

        /*
    changeAmount(e, menu) {
        const amount = e.target.value;
        const action = addCart(menu, amount);
        const res = this.props.dispatch(action);
        this.setState({
            amount: res.amount
        });
    }
    */

    render() {
        const { classes, dispatch, open, onClose, cart } = this.props;
        const menu = cart.selecting;
        const cartMenu = (cart.list.filter(cm => cm.id === menu.id))[0] || {amount: 0};
        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{menu.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        単価: {menu.price}
                        合計金額: {menu.price * this.state.amount}
                    </DialogContentText>
                    <Button onClick={() => dispatch(subCart(menu))}>
                        <KeyboardArrowLeft />
                    </Button>
                    {cartMenu.amount}
                    <Button onClick={() => dispatch(addCart(menu))}>
                        <KeyboardArrowRight />
                    </Button>
                </DialogContent>
            </Dialog>
        );
   }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});


MenuModal = connect(s => s)(MenuModal);
MenuModal = withStyles(styles)(MenuModal);
export default MenuModal;
