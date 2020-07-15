import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { SnakeAction } from '../Snake/snakeAction';
import { Game } from '../game';
import socket from '../socket';
interface Props {
    block: Block;
    game: Game;
    status:boolean;
}
export class Block {
    @observable coordinate = {
        x: 0,
        y: 0
    }
    size: number | undefined;
    constructor(public type: string, coordinate: { x: number, y: number }, public color: string) {
        this.coordinate = coordinate;
        socket.on('setSnakeSize', (size: number) => {
            this.size = size;
        })
    }
}
@observer
export default class BlockComponent extends React.Component<Props>{
    game: Game;
    block: Block;
    coordinate: { x: number, y: number };
    action: SnakeAction | undefined;
    color: string;
    constructor(props: Props) {
        super(props);
        this.coordinate = this.props.block.coordinate;
        this.game = this.props.game;
        this.block = this.props.block;
        this.color = this.block.color;
        if (this.block.type == 'head') {
            this.action = new SnakeAction(this.game);
        }
    }
    render() {
        if (this.action) {
            var date = {
                coordinate:this.coordinate,
                status:this.props.status
            }
            this.action.eatBall(date);
        }
        let { x, y } = this.coordinate;
        return (
            <rect x={x} y={y} width={this.block.size} height={this.block.size} fill={this.color} />
        )
    }
}