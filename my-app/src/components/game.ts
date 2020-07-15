import { Snake } from './Snake/snake';
import { Ball } from './Ball/ball';
import { Score } from './Score/score';
export class Game {
    score: Score;
    snake: Snake;
    ball: Ball;
    anotherSnake: { x: number, y: number }[]
    constructor() {
        this.snake = new Snake(this);
        this.ball = new Ball(this);
        this.score = new Score(this);
        this.anotherSnake = [];
        setInterval(() => {
            this.anotherSnake = [];
        }, 500)
    }
}