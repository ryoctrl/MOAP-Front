import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import MenuModal from './MenuModal';

const IMAGE_PATH = process.env.REACT_APP_API_HOST + 'images/';

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
        let img;
        if(!menu.image) img = '/img/no-image.svg';
        else img = IMAGE_PATH + menu.image;
        return (
            <Card key={menu.id}>
                <CardActionArea onClick={() => this.handleOpen() }>
                    <CardMedia className={classes.media}image={img} title={menu.name}/>
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
        backgroundSize: 'contain'
    },
});

export default withStyles(styles)(MenuCard);
