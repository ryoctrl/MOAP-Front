import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';


class MenuCard extends Components {
    render() {
        const { menu } this.props;
        return (
            <Card key={menu.id} className={classes.card}>
            </Card>
        )
    }

}

const styles = theme => ({

});

export default withStyles(styles)(MenuCard);
