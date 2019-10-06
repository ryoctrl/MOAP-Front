import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { 
    AppBar, 
    Button, 
    Divider, 
    Drawer, 
    MenuItem, 
    IconButton,
    Toolbar, 
    Typography 
} from '@material-ui/core';
import { 
    Menu as MenuIcon, 
    ChevronLeft as ChevronLeftIcon, 
    ShoppingCart 
} from '@material-ui/icons';
import {
    openCart,
    changePage,
    toggleDrawer as toggleDrawerAction
} from '../stores/actions';
import CartModal from './CartModal';

class NavBar extends Component {
    openCart = () => this.props.dispatch(openCart())
    toggleDrawer = () => this.props.dispatch(toggleDrawerAction())
    changePage = name => this.props.dispatch(changePage(name))

    render() {
        const { classes, user: { remainStr: remain }, page } = this.props;

        return (
            <div>
                <AppBar position="fixed" className={classNames(classes.appBar, {[classes.appBarShift]: page.drawerOpen,})}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.toggleDrawer} className={classes.menuButton}>
                                <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            MOAP
                        </Typography>
                        <Typography color="inherit" className={classNames({[classes.hide]: page.drawerOpen})}>
                            残高: {remain}
                        </Typography>
                        <Button onClick={this.openCart.bind(this)} color="inherit" className={classNames({[classes.hide]: page.drawerOpen})}>
                            <ShoppingCart/>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer 
                    className={classes.drawer}
                    onClick={this.toggleDrawer} 
                    anchor="left"
                    classes={{paper: classes.drawerPaper,}}
                    open={page.drawerOpen}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider/>
                    <MenuItem onClick={() => this.changePage('TOP')}>メニュー</MenuItem>
                    <MenuItem onClick={() => this.changePage('HISTORY')}>注文履歴</MenuItem>
                    <MenuItem onClick={() => this.changePage('SETTINGS')}>設定</MenuItem>
                </Drawer>
                <CartModal/>
            </div>
        );
    }
}

NavBar = connect(states => states)(NavBar);
export default NavBar;

