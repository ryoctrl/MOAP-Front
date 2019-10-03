import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Button, Divider, Drawer, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import {
    openCart
} from '../stores/actions';
import CartModal from './CartModal';

class NavBar extends Component {
    openCart() {
        this.props.dispatch(openCart());
    }

    render() {
        const { classes, user: { remainStr: remain }, dispatch } = this.props;

        return (
            <div>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            MOAP
                        </Typography>
                        <Typography color="inherit">
                            残高: {remain}
                        </Typography>
                        <Button onClick={this.openCart.bind(this)} color="inherit">
                            <ShoppingCart/>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer>
                    <Divider/>
                    <MenuItem />
                    <MenuItem />
                </Drawer>
                <CartModal classes={classes}/>
            </div>
        );
    }
}

export default connect(states => states)(NavBar);

