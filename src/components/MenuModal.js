import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import { addCart } from '../stores/Cart';

class MenuModal extends Component {
    constructor(props) {
        super();
        this.state = {
            amount: 0
        };
    }

    changeAmount(e, menu) {
        const amount = e.target.value;
        const action = addCart(menu, amount);
        const res = this.props.dispatch(action);
        this.setState({
            amount: res.amount
        });
    }

    render() {
        const { classes, menu, open, onClose, cart } = this.props;
        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{menu.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        単価: {menu.price}
                        合計金額: {menu.price * this.state.amount}
                    </DialogContentText>
                    <TextField 
                        id="standard-number" 
                        label="数量" 
                        value={this.state.amount}
                        min={0}
                        max={menu.stocks}
                        onChange={e => this.changeAmount(e, menu)}
                        type="number" 
                        className={classes.textField} 
                        InputLabelProps={{shrink: true, }} 
                        margin="normal"/>
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


/*
MenuModal = connect(s => s)(MenuModal);
MenuModal = withStyles(styles)(MenuModal);

export default MenuModal;
*/

export default withStyles(styles)(connect(s => s)(MenuModal));
