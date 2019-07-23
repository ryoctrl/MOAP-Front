import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { withStyles } from '@material-ui/core/styles';
import MenuCard from '../components/MenuCard';

const API_HOST = process.env.REACT_APP_API_HOST;
const MenuEndpoint = API_HOST + 'api/menues';

class Menu extends Component {
    render() {
        const { classes, menu } = this.props;
        const menuList = menu.list;
        return (
            <div className={classes.container}>
                {menu.fetching && <Bounce className={classes.loader}/>}
                {!menu.fetching && menuList.length === 0 && <div>{menu.error}</div>}
                <Grid container spacing={24}>
                {menuList.map(item => (
                    <Grid key={item.id} item xs={6} lg={3} className={classes.card}>
                        <MenuCard key={item.id} menu={item}/>
                    </Grid>
                ))}
                </Grid>
            </div>
        )
    }
}

const styles = theme => ({
    loader: {
        height: '8px',
        width: '30px',
        position: 'absolute',
        margin: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    card: {
        width: '100%',

    }
});

const select = datas => datas;
Menu = connect(select)(Menu);
export default withStyles(styles)(Menu);

