import React from 'react';
import socket from '../socket';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './game-form.css';
const axios = require('axios').default;

export class GameForm extends React.Component {
    roomName: String = '';
    constructor(props: Readonly<{}>) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.changeRoomName = this.changeRoomName.bind(this);

    }
    createRoom() {

        axios.post('http://localhost:8080/room/saveRoom', {
            name: this.roomName
        })
            .then((res: any) => {
                socket.emit('create_room', this.roomName);
            });
    }
    changeRoomName(event: React.ChangeEvent<HTMLInputElement>) {
        this.roomName = event.target.value;
    }
    render() {
        return (
            <>
                <h2>Create room</h2>
                <TextField color="primary" id="standard-basic" label="room name" onChange={this.changeRoomName} className="text" />
                <div className="btn">
                    <Button variant="outlined" color="primary" onClick={this.createRoom} className="btn" >
                        Create Room
      </Button>
                </div>
            </>
        )
    }
}