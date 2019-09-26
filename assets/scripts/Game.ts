import Star from "./Star";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    star: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property({
        type: cc.AudioClip
    })
    scoreAudio: cc.AudioClip = null;

    @property
    maxStarDuration: number = 0;

    @property
    minStarDuration: number = 0;

    groundY: number = 0;

    score: number = 0;

    timer: number = 0;

    starDuration: number = 0;

    onLoad(): void {
        this.groundY = this.ground.y + this.ground.height / 2;

        this.timer = 0;
        this.starDuration = 0;

        this.spawnNewStar();
        this.score = 0;
    }

    start(): void {
    }

    update(dt: number): void {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    }

    spawnNewStar(): void {
        var newStar = cc.instantiate(this.star);
        this.node.addChild(newStar);
        newStar.setPosition(this.starPosition());
        (newStar.getComponent('Star') as Star).game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }

    starPosition(): cc.Vec2 {
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    }

    addPoint(): void {
        this.score += 1;
        this.scoreLabel.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('Game');
    }
}
