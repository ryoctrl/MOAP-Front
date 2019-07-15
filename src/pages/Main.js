import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Menu from './Menu';
import NavBar from '../components/NavBar';

import { Provider } from 'react-redux';
import configureStore from '../stores/store';

import { fetchMenus } from '../stores/actions';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchMenus());
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <NavBar theme={theme} classes={classes} />
                    <main className={classes.content}>
                        <Menu />
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    grow: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 10,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
});

Main = connect()(Main);
export default withStyles(styles, { withTheme: true })(Main);
