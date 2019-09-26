import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    // In pixels.
    @property
    pickRadius: number = 0;

    game: Game = null;

    getPlayerDistance(): number {
        var playerPos = this.game.player.getPosition();
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    }

    onPicked(): void {
        this.game.spawnNewStar();
        this.game.addPoint();
        this.node.destroy();
    }

    update(dt: number): void {
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
        }
    }

}
