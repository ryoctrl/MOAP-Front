import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class NavBar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <AppBar position="fixed" clasName={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        MOAP
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;

