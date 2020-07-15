import { Snake } from "./snake";
import { Game } from "../game";
import socket from "../socket";
import { number } from "prop-types";
import { kMaxLength } from "buffer";
import {sockets} from '../../index';
interface Date {
    coordinate: { x: number, y: number },
    status: boolean
}
export class SnakeAction {
    fieldSize: number = 200;
    snakeSize: number = 10;
    roomName: string = '';
    constructor(public game: Game) {
        socket.on('setFiledSize', (size: number) => {
            this.fieldSize = size;
        })
        socket.on('setSnakeSize', (size: number) => {
            this.snakeSize = size;
        })
        socket.on('setRoomName', (name: string) => {
            this.roomName = name;
        })
    }

    eatBall(date: Date) {
        let ballCoordinate = this.game.ball.coordinate;
        var color = this.game.ball.color;
        var coordinate = date.coordinate;
        if ((coordinate.x >= ballCoordinate.x && coordinate.x <= (ballCoordinate.x + this.snakeSize)) && (coordinate.y >= ballCoordinate.y && coordinate.y <= (ballCoordinate.y + this.snakeSize))) {
            this.game.ball.changeBallCoordinate();
            this.game.score.addScore();
            this.game.snake.addBlocks(color);
        }
        if (coordinate.x < 0 || coordinate.x > this.fieldSize - 10 || coordinate.y < 0 || coordinate.y > this.fieldSize - 10) {
            if (!date.status) {
                sockets.sendMessaage(this.roomName);
            }
            socket.emit('return_game');
        }
    }
}