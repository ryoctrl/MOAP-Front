import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import MenuModal from './MenuModal';

import { selectMenu } from '../stores/actions';

const IMAGE_PATH = process.env.REACT_APP_API_HOST + 'images/';

class MenuCard extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        const { dispatch, menu } = this.props;
        dispatch(selectMenu(menu));
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
        const isSoldOut = menu.stocks === 0;
        let img;
        if(!menu.image) img = '/img/no-image.svg';
        else img = IMAGE_PATH + menu.image;
        return (
            <Card key={menu.id}>
                <CardActionArea disabled={isSoldOut} onClick={() => this.handleOpen() }>
                    <CardMedia className={classes.media}image={img} title={menu.name}>
                        { isSoldOut && <div className={classes.soldOut}>
                            SOLD OUT
                        </div>}
                    </CardMedia>
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
    soldOut: {
        [theme.breakpoints.down('md')]: {
            top: '20%',
            fontSize: '20px',
        },
        [theme.breakpoints.up('md')]: {
            top: '40%',
            fontSize: '32px',
            height: '10%',
        },

        position: 'absolute',
        backgroundColor: 'red',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'white',
        width: '100%',
    },
});

MenuCard = connect()(MenuCard);
export default withStyles(styles)(MenuCard);
