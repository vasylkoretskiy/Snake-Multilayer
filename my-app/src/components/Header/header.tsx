import React from 'react';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#558b2f"
        },
        secondary: {
            main: '#f44336',
        },
    },
});

export class Header extends React.Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" color='primary'>
                        <Toolbar>
                            <Typography variant="h6" >
                                Snake Game
              </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>

            </div>
        )
    }
}