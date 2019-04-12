import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuCard from '../components/MenuCard';

const API_HOST = process.env.REACT_APP_API_HOST;
const MenuEndpoint = API_HOST + 'api/menues';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menu: []
        }
    }
    componentDidMount() {
        fetch(MenuEndpoint)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    menu: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }
    render() {
        const { classes } = this.props;
        const { error, isLoaded, menu } = this.state;
        if(error) {
            return <div> Error: {error.message}</div>
        } else if(!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (
                <Grid container spacing={24}>
                {menu.map(item => (
                    <Grid item xs={6} lg={3} className={classes.card}>
                        <MenuCard key={item.id} menu={item}/>
                    </Grid>
                ))}
                </Grid>
            )
        }
    }
}

const styles = theme => ({
    card: {
        width: '100%',

    }
});

export default withStyles(styles)(Menu);

