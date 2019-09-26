import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    // In pixels.
    @property
    pickRadius: number = 0;

    game: Game = null;

    getPlayerDistance = function (): number {
        var playerPos = this.game.player.getPosition();
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    }

    onPicked = function () {
        this.game.spawnNewStar();
        this.node.destroy();
    }

    update(dt: number): void {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
        }
    }

}
