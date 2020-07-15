import React from 'react';
import { observable, action } from 'mobx';
import socket from '../socket';
import { observer } from 'mobx-react';
import { MDCList } from '@material/list';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { GiSandSnake } from "react-icons/gi";
import { GiSnake } from "react-icons/gi";
import { GiSnakeTongue } from "react-icons/gi";
import { GiSnakeSpiral } from "react-icons/gi";
import { GiSnakeBite } from "react-icons/gi";
import { GiRattlesnake } from "react-icons/gi";


import './room-list.css';
interface Props {
    status: boolean;
}
@observer
export class RoomList extends React.Component<Props>{
    rooms: String[] = [];
    myRef: any;
    axios: any;
    @observable roomsList: JSX.Element[] | undefined;
    snakeIcons: JSX.Element[] = [
        <GiSandSnake className="icon" />,
        <GiSnake className="icon" />,
        <GiSnakeTongue className="icon" />,
        <GiSnakeSpiral className="icon" />,
        <GiSnakeBite className="icon" />,
        <GiRattlesnake className="icon" />,
    ];
    constructor(props: Props) {
        super(props);
        this.axios = require('axios').default;

        socket.on('add_room', (rooms: any[]) => {
            this.getAllRooms();
        })
    }
    @action createRoomList(rooms: any[]) {
        var iconIndex = -1;
        this.roomsList = rooms.map((item, index) => {
            if (iconIndex == this.snakeIcons.length - 1)
                iconIndex = -1;
            iconIndex++;

            return (
                <div className="room">
                    {this.snakeIcons[iconIndex]}
                    <ListItem button key={index} onClick={() => this.connectToRoom(item)}>
                        {item.name}
                    </ListItem>
                    <ListItem button>
                        Users online         {item.online}
                    </ListItem>
                </div>

            )
        })
    }
    connectToRoom = (room: String) => {
        socket.emit('room_connection', { room: room, status: this.props.status });
    }
    getAllRooms = () => {
        this.axios.get('http://localhost:8080/room/getRooms')
            .then((res: any) => {
                this.rooms = res.date;
                console.log(res);
                if (res.data)
                    this.createRoomList(res.data);
            });
    }
    componentWillMount() {
        this.getAllRooms();
    }

    render() {
        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Rooms List
        </ListSubheader>
                }   >
                {this.roomsList}
            </List>
        )
    }
}