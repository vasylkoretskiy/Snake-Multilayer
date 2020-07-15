import React from 'react';
import { Game } from '../game';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { string } from 'prop-types';
import socket from '../socket';
interface Props {
    game: Game;
}
interface ball {
    coordinate: { x: number, y: number },
    color: string
}
export class Ball {
    roomName: String | undefined;
    size: number | undefined;
    @observable color: string = 'rgb(12, 0, 0)';
    @observable coordinate: { x: number, y: number } = {
        x: 1000,
        y: 1000
    }
    constructor(public game: Game) {
        socket.on('setBallSize', (size: number) => {
            this.size = size;
        })
    }
    @action genericBall() {
        socket.emit('genricBall');
        socket.on('ball', (date: ball) => {
            this.coordinate = date.coordinate;
            this.color = date.color;
        });
    }
    @action changeBallCoordinate() {
        socket.emit('changeBallCoordinate');
        socket.on('ballNew', (date: ball) => {
            this.coordinate = date.coordinate;
            this.color = date.color;
        });
    }
}
@observer
export default class BallComponent extends React.Component<Props>{
    color: string | undefined;
    ball: Ball;
    constructor(props: Props) {
        super(props);
        this.props.game.ball.genericBall();
        this.ball = this.props.game.ball;
    }
    render() {
        this.color = this.props.game.ball.color;
        var { x, y } = this.props.game.ball.coordinate;
        return (
            <rect x={String(x)} y={String(y)} width={this.ball.size} height={this.ball.size} fill={this.color} />
        )
    }

}