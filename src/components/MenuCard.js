import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import MenuModal from './MenuModal';


class MenuCard extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { classes, menu } = this.props;
        if(!menu.image) menu.image = '/img/no-image.svg';
        return (
            <Card key={menu.id}>
                <CardActionArea onClick={() => this.handleOpen() }>
                    <CardMedia className={classes.media}image={menu.image} title={menu.name}/>
                    <CardContent>
                        <Typography variant="subtitle1" component="h2">
                            {menu.name}
                        </Typography>
                        <Typography variant="body1" component="h2">
                            {menu.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <MenuModal open={this.state.open} onClose={this.handleClose} menu={menu}/>
            </Card>
        )
    }
}

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
});

export default withStyles(styles)(MenuCard);
