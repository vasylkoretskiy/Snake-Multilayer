import React from 'react';
import './select_size.css';
import { number } from 'prop-types';
import socket from '../socket';
import {sockets} from '../../index';
const axios = require('axios').default;

interface Props {
    roomName: string
}
export class Select_Size extends React.Component<Props>{
    field: number = 200;
    snake: number = 10;
    constructor(props: Props) {
        super(props);
    }
    SaveSelect = () => {
        axios.post('http://localhost:8080/room/setSize', {
            name: this.props.roomName,
            fieldSize: this.field,
            snakeSize: this.snake
        })
            .then((res: any) => {
                sockets.setSize( { snake: this.snake, field: this.field, name: this.props.roomName });
            });
    }
    selectSnakeSize = (event: React.ChangeEvent<HTMLSelectElement>) => {

        this.snake = parseInt(event.target.value);
    }
    selectFieldSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.field = parseInt(event.target.value);
    }
    render() {
        return (
            <div className="cont">
                <h1 className="param">
                    Select snake size
           <select className="select custom-select custom-select-lg mb-3" onChange={this.selectSnakeSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </h1>
                <h1 className="param">
                    Select field size
             <select className="select custom-select custom-select-lg mb-3" onChange={this.selectFieldSize}>
                        <option value="200"> 200</option>
                        <option value="600">600</option>
                    </select>
                </h1>
                <button className="btn btn-secondary" onClick={this.SaveSelect}> Save</button>
            </div>

        )
    }
}