import React, { Component } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import CartModal from './CartModal';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            cartOpen: false,
        }
    }

    openCart() {
        this.setState({
            cartOpen: true,
        });
    }

    closeCart() {
        this.setState({
            cartOpen: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            MOAP
                        </Typography>
                        <Button onClick={() => this.openCart()} color="inherit">
                            <ShoppingCart/>
                        </Button>
                    </Toolbar>
                </AppBar>
                <CartModal classes={classes} open={this.state.cartOpen} onClose={() => this.closeCart()}/>
            </div>
        );
    }
}

export default NavBar;

