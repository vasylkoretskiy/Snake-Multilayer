import React from 'react';
import { Block } from '../Block/block';
import BlockComponent from '../Block/block';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Game } from '../game';
import socket from '../socket';

interface Props {
    game: Game;
    status: boolean;
}
export class Snake {
    @observable blocks: Block[] = [];
    interval: any;
    snakeId: Number | undefined;
    moveDirection: String = '';
    step: number = 10;
    authStatus: boolean | undefined;
    color_green: string = 'rgb(118, 249, 0)';
    constructor(public game: Game) {


        socket.on('setSnakeSize', (size: number) => {
            this.step = size;
        })
        this.blocks.push(new Block('head', { x: 20, y: 0 }, this.color_green), new Block('body', { x: 0, y: 0 }, this.color_green));
        socket.on('newConnection', () => {
            socket.emit('snakeMove', { blocks: this.blocks, direction: this.moveDirection, id: this.snakeId });
        });
    }
    Restart() {

        this.startMove('ArrowRight');
        this.blocks = [];
        this.blocks.push(new Block('head', { x: 20, y: 0 }, this.color_green), new Block('body', { x: 0, y: 0 }, this.color_green));
        this.game.score.RestartYourScore();

    }
    @action addBlocks(color: string) {
        var lastblock = this.blocks[this.blocks.length - 1].coordinate;
        this.blocks.push(new Block('body', { x: lastblock.x + 10, y: lastblock.y }, color));
        socket.emit('snakeMove', { blocks: this.blocks, direction: this.moveDirection, id: this.snakeId });
    }
    setSnakeId(id: Number) {
        this.snakeId = id;
    }
    startMove(key: String) {

        socket.emit('snakeMove', { blocks: this.blocks, direction: key, id: this.snakeId });
        this.moveDirection = key;
        if (this.moveDirection == 'ArrowUp' && key == 'ArrowDown')
            return;
        if (this.moveDirection == 'ArrowDown' && key == 'ArrowUp')
            return;
        if (this.moveDirection == 'ArrowRight' && key == 'ArrowLeft')
            return;
        if (this.moveDirection == 'ArrowLeft' && key == 'ArrowRight')
            return;
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            var previos = Object.assign({}, this.blocks[0].coordinate);
            var before;
            for (var i = 0; i < this.blocks.length; i++) {
                if (this.blocks[i].type == 'head') {
                    if (key == 'ArrowRight') {
                        this.blocks[i].coordinate.x += this.step;
                    }
                    if (key == 'ArrowDown')
                        this.blocks[i].coordinate.y += this.step;
                    if (key == 'ArrowUp')
                        this.blocks[i].coordinate.y -= this.step;
                    if (key == 'ArrowLeft')
                        this.blocks[i].coordinate.x -= this.step;
                    var { x, y } = this.blocks[i].coordinate;
                    this.game.anotherSnake.forEach((item) => {
                        if ((x >= item.x && x <= item.x) && (y >= item.y && y <= item.y)) {
                            this.Restart();
                        }
                    })
                }
                else {
                    before = Object.assign({}, this.blocks[i].coordinate);
                    this.blocks[i].coordinate.x = previos.x;
                    this.blocks[i].coordinate.y = previos.y;
                    previos = Object.assign({}, before);
                }
            }
        }, 200);
    }
}
@observer
export default class SnakeComponent extends React.Component<Props, {}> {
    snake: Snake;
    blocks: JSX.Element[] = [];
    constructor(props: Props) {
        super(props);
        this.snake = this.props.game.snake;
        this.snake.startMove('ArrowRight');
    }
    componentWillMount() {
        document.addEventListener("keydown", (event) => {
            this.snake.startMove(event.key);
        });
        socket.on('restartSnake', () => {
            this.snake.Restart();
        })
    }
    genericBlocks() {
        this.blocks = this.snake.blocks.map((item, index) => {
            return (
                <BlockComponent key={index} block={item} game={this.props.game} status={this.props.status} />
            )
        })
    }
    render() {
        this.genericBlocks();
        return (
            this.blocks
        )
    }
}