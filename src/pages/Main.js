import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import NavBar from '../components/NavBar';

import { Provider } from 'react-redux';
import CartStore from '../stores/Cart';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

class Main extends Component {
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={CartStore}>
                    <div className={classes.root}>
                        <NavBar theme={theme} classes={classes} />
                        <main className={classes.content}>
                            <Menu />
                        </main>
                    </div>
                </Provider>
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

export default withStyles(styles, { withTheme: true })(Main);
