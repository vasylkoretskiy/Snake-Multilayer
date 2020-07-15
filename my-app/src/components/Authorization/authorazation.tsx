import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import './auth.css';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import socket from '../socket';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
    typography: {
        fontFamily: 'Titillium Web',
        fontSize: 20,
        body1: {
            fontWeight: 500,
        },
    },
    palette: {
        primary: {
            main: "#009688",
        },
        secondary: {
            main: '#f44336',
        },
    },
});
const axios = require('axios').default;
@observer
export class Authorazation extends React.Component {
    authStatus: boolean | undefined;
    login: string = '';
    password: string = '';
    nickname: string = '';
    @observable errorPassword: boolean = false;
    @observable errorLogin: boolean = false;
    constructor(props: Readonly<{}>) {
        super(props);
    }
    setLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.login = event.target.value;
    }
    setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.password = event.target.value;
    }
    setNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.nickname = event.target.value;
    }
    Login = () => {
        axios
            .post('http://localhost:8080/user/login',
                {
                    login: this.login,
                    password: this.password,
                    nickname: this.nickname
                })
            .then((response: any) => {
                if (response.data == true) {
                    this.authStatus = true;
                    socket.emit('success_login', this.authStatus);
                }
                else if (response.data == 'Wrong password') {
                    this.errorPassword = true;
                }
                else {
                    this.errorLogin = true;
                }
            })
    }
    PlayAsGuest = () => {
        this.authStatus = false;
        socket.emit('success_login', this.authStatus);
    }
    Registration = () => {
        if (!this.login.length) {
            this.errorLogin = true;
        }
        if (!this.password.length) {
            this.errorPassword = true;
        }
        else {
            this.errorLogin = false;
            this.errorPassword = false;
            axios
                .post('http://localhost:8080/user/register',
                    {
                        login: this.login,
                        password: this.password,
                        nickname: this.nickname
                    })
                .then((response: any) => {
                    alert('Register success');
                })
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="container">
                <ThemeProvider theme={theme}>
                    <p>
                        <TextField className="textField" id="standard-basic" label="Your nick in game" onChange={this.setNickName} />
                    </p>
                    <p>
                        <TextField type="email" error={this.errorLogin} className="textField" id="standard-basic" label="Login" onChange={this.setLogin} />
                    </p>
                    <p>
                        <TextField error={this.errorPassword} className="textField" id="standard-basic" label="Password" onChange={this.setPassword} />
                    </p>
                </ThemeProvider>
                <div className="buttons">
                    <Button className="button" variant="contained" color="primary" onClick={this.Registration}>
                        Registrate
                 </Button>
                    <Button className="button" variant="contained" onClick={this.Login}>Login</Button>
                    <Button className="button" variant="contained" color="secondary" onClick={this.PlayAsGuest}>
                        Play as guest
                </Button>
                </div>



            </div>
        )
    }
}