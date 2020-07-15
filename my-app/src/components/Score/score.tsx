import React from 'react';
import { observable, action } from 'mobx';
import {sockets} from '../../index';
import { observer } from 'mobx-react';
import { Game } from '../game';
import socket from '../socket';
interface Props {
    game: Game;
}
export class Score {
    @observable yourScore: number = 0;
    @observable enemyScore: Number = 0;
    constructor(public game: Game) {
        socket.on('setEnemyScore', (score: Number) => {
            this.addEnemyScore(score);
        })
    }
    @action addEnemyScore(score: Number) {
        this.enemyScore = score;
    }
    @action addScore() {
        this.yourScore++;

        sockets.addScore(this.yourScore);
    }
    @action RestartYourScore() {
        this.yourScore = 0;
    }
    @action RestartEnemyScore() {
        this.enemyScore = 0;
    }
}
@observer
export class ScoreComponent extends React.Component<Props> {
    yourScore: Number | undefined;
    enemyScore: Number | undefined;

    constructor(props: Props) {
        super(props);

    }
    componentWillMount() {
        socket.on('restartScore', () => {
            this.props.game.score.RestartYourScore();
        })
        socket.on('restartEnemyScore', () => {
            this.props.game.score.RestartEnemyScore();
        })
    }
    render() {
        this.yourScore = this.props.game.score.yourScore;
        this.enemyScore = this.props.game.score.enemyScore;
        return (
            <div>
                <div>Your score {this.yourScore} </div>
                <div>Enemy score {this.enemyScore} </div>
            </div>
        )
    }
}