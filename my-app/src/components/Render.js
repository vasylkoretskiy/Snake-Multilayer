import ReactDom from 'react-dom';
import React from 'react';
import { FieldComponent } from './Field/field';
import { Header } from './Header/header';
import { Select_Size } from './Select_Size/select_size';
import { GameForm } from './Game-Form/game-form';
import { RoomListComponent } from './Room_lists/room-lists';
import { Authorazation } from './Authorization/authorazation';
import Button from '@material-ui/core/Button';
import { sockets } from '../index';
import '../snake.css';
var authStatus;

export class Render {
    constructor() {
        ReactDom.render((
            <Header />
        ), document.getElementById('header'));
    }
    startGame(id) {
        ReactDom.render(
            (
                <>
                    <FieldComponent id={id} status={authStatus} />
                </>
            ), document.getElementById('root'));
    }
    selectSize() {
        ReactDom.render(
            (
                <Select_Size />
            ), document.getElementById('root'));
    }
    snakeSetting(status) {
        authStatus = status;
        var gameForm;
        if (authStatus) {
            gameForm = <GameForm />
        }
        else {
            gameForm = <div>You cannot create rooms until you are authorized
</div>
        }
        ReactDom.render((
            <div className="list">
                <div className="left_column">
                    {gameForm}
                </div>
                <div className="right_column">
                    <RoomListComponent status={status} />
                </div>
            </div>
        ), document.getElementById('root'));
    }
    auth() {
        ReactDom.render((
            <Authorazation />
        ), document.getElementById('root'));
    }
    waitOtherPlayers() {
        ReactDom.render(
            (
                <h1>please wait for other players
               </h1>
            ), document.getElementById('root'));
    }
    message() {
        var backToMenu = () => {
            sockets.getAuth();
        }
        ReactDom.render(
            (
                <div>
                    <h1>Sorry,you can play only one game,while you are not authorized
               </h1>
                    <Button onClick={backToMenu} variant="contained">Back to menu</Button>
                </div>

            ), document.getElementById('root'));
    }
}
export let render = new Render();
