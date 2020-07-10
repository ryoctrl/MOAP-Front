import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Menu from './Menu';
import Settings from './Settings';
import HistoryPage from './History';
import NavBar from '../components/NavBar';
import InitializeModal from '../components/Modals/InitializeModal';
import { fetchMenus } from '../stores/actions';

const drawerWidth = 240;

const theme = createMuiTheme({
    typography: {
        useNextVarialts: true,
    }
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(fetchMenus());
    }
    render() {
        const { classes, page } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <NavBar theme={theme} classes={classes} />
                    <main className={classes.content}>
                        <InitializeModal />
                        {page.name === 'TOP' && <Menu />}
                        {page.name === 'HISTORY' && <HistoryPage />}
                        {page.name === 'SETTINGS' && <Settings />}
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
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeout,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth
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
    inline: {
        display: 'inline'
    },
    hide: {
        display: 'none'
    }
});

Main = connect(stores => stores)(Main);
export default withStyles(styles, { withTheme: true })(Main);
