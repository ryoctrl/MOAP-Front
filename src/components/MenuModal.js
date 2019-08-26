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
    render() {
        const { classes, dispatch, open, onClose, cart } = this.props;
        const menu = cart.selecting;
        const cartMenu = (cart.list.filter(cm => cm.id === menu.id))[0] || {amount: 0};
        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle>{menu.name}</DialogTitle>
                <DialogContent className={classes.content}>
                    <div className={classes.content}>
                        <span className={classes.textTitle}>単価:</span>
                        <span className={classes.text}>{menu.price}</span>
                    </div>
                    <DialogContentText className={classes.content}>
                        {/*
                            <div className={classes.content}>
                            */}
                        <span className={classes.textTitle}>合計金額:</span>
                        <span className={classes.text}>{menu.price * cartMenu.amount}</span>
                    </DialogContentText>
                    <div className={classes.content}>
                        <Button onClick={() => dispatch(subCart(menu))}>
                            <KeyboardArrowLeft />
                        </Button>
                        {cartMenu.amount}
                        <Button onClick={() => dispatch(addCart(menu))}>
                            <KeyboardArrowRight />
                        </Button>
                    </div>
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
    },
    content: {
        alignItems: 'center',
        textAlign: 'center'
    },
    textTitle: {
        textAlign: 'left',
    },
    text: {
        textAlign: 'center'

    }
});


MenuModal = connect(s => s)(MenuModal);
MenuModal = withStyles(styles)(MenuModal);
export default MenuModal;
