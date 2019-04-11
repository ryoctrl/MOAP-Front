import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Menu from './Menu';

const theme = createMuiTheme();

class Main extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Menu />
            </MuiThemeProvider>
        )
    }
}

export default Main;
