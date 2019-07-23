import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MenuCard from '../components/MenuCard';

const API_HOST = process.env.REACT_APP_API_HOST;
const MenuEndpoint = API_HOST + 'api/menues';

class Menu extends Component {
    render() {
        const { classes, menu } = this.props;
        const menuList = menu.list;
        return (
            <Grid container spacing={24}>
            {menuList.map(item => (
                <Grid key={item.id} item xs={6} lg={3} className={classes.card}>
                    <MenuCard key={item.id} menu={item}/>
                </Grid>
            ))}
            </Grid>
        )

        /*
        const { error, isLoaded, menu } = this.state;
        if(error) {
            return <div> Error: {error.message}</div>
        } else if(!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (
                <Grid container spacing={24}>
                {menu.map(item => (
                    <Grid key={item.id} item xs={6} lg={3} className={classes.card}>
                        <MenuCard key={item.id} menu={item}/>
                    </Grid>
                ))}
                </Grid>
            )
        }
        */
    }
}

const styles = theme => ({
    card: {
        width: '100%',

    }
});

const select = datas => datas;
Menu = connect(select)(Menu);
export default withStyles(styles)(Menu);

