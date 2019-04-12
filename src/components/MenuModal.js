import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class MenuModal extends Component {
    constructor(props) {
        super();
        this.state = {
            amount: 0,
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    };

    render() {
        const { classes, menu, open, onClose } = this.props;
        return (
            <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{menu.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        単価: {menu.price}
                        合計金額: {menu.price * this.state.amount}
                    </DialogContentText>
                    <TextField id="standard-number" label="数量" value={this.state.amount} onChange={this.handleChange('amount')} type="number" className={classes.textField} InputLabelProps={{shrink: true, }} margin="normal"/>
                </DialogContent>
            </Dialog>
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
