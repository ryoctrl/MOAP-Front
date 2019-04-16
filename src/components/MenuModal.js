import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CartContext from '../contexts/cart';

class MenuModal extends Component {
    constructor(props) {
        super();
        this.state = {
            amount: 0
        };
    }

    changeAmount(e, menu, context) {
        const amount = e.target.value;
        context.addCart(menu, amount);
        this.setState({
            amount: context.getAmount(menu)
        });
    }

    render() {
        const { classes, menu, open, onClose } = this.props;
        return (
            <CartContext.Consumer>
            {context => 
                <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
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
                            onChange={e => this.changeAmount(e, menu, context)}
                            type="number" 
                            className={classes.textField} 
                            InputLabelProps={{shrink: true, }} 
                            margin="normal"/>
                    </DialogContent>
                </Dialog>
            }
            </CartContext.Consumer>
        )
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

export default withStyles(styles)(MenuModal);
