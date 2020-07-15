import React from 'react';
import { Block } from '../Block/block';
import BlockComponent from '../Block/block';
import { Game } from '../game';
import openSocket from 'socket.io-client';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import socket from '../socket';
interface Props {
    game: Game;
    id: Number;
}
@observer
export default class AnotherSnake extends React.Component<Props>{
    @observable blocksComponent: JSX.Element[] | undefined;
    interval: any;
    speed: number = 200;
    id: Number;
    step: number;
    size: number | undefined;
    constructor(props: Props) {
        super(props);
        this.id = this.props.id;
        this.step = 10;
        socket.on('setSnakeSize', (size: number) => {
            this.size = size;
            this.step = size
        })
    }
    @action startMove(request: { blocks: Block[], direction: String, id: Number }) {
        clearInterval(this.interval);
       
        var { blocks, direction } = request;
        this.interval = setInterval(() => {
            var previos = Object.assign({}, blocks[0].coordinate);
            var before;
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].type == 'head') {
                    if (direction == 'ArrowRight') {
                        blocks[i].coordinate.x += this.step;
                    }
                    if (direction == 'ArrowDown') {
                        blocks[i].coordinate.y += this.step;
                    }
                    if (direction == 'ArrowUp') {
                        blocks[i].coordinate.y -= this.step;
                    }
                    if (direction == 'ArrowLeft') {
                        blocks[i].coordinate.x -= this.step;
                    }
                }
                else {
                    before = Object.assign({}, blocks[i].coordinate);
                    blocks[i].coordinate.x = previos.x;
                    blocks[i].coordinate.y = previos.y;
                    previos = Object.assign({}, before);
                    this.props.game.anotherSnake.push(blocks[i].coordinate);
                }
            }
            this.blocksComponent = blocks.map((item, index) => {
                return (
                    <rect key={index} x={item.coordinate.x} y={item.coordinate.y} width={this.size} height={this.size} fill='rgb(255, 0, 0)' />
                )
            })

        }, this.speed);
    }
    componentDidMount() {
        socket.on('newCoordinate', (request: { blocks: Block[], direction: String, id: Number }) => {
            if (this.id == request.id) {
                this.startMove(request);
            }
        })
    }
    render() {
        if (this.blocksComponent) {
            return (
                this.blocksComponent
            )
        }
        else {
            return (
                <div></div>
            )
        }

    }
}