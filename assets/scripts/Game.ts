
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    star: cc.Prefab = null;

    @property(cc.Node)
    ground: cc.Node = null

    @property(cc.Node)
    player: cc.Node = null;

    @property
    maxStarDuration: number = 0;

    @property
    minStarDuration: number = 0;

    groundY: number = 0;

    onLoad(): void {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    }

    start(): void {
    }

    spawnNewStar(): void {
        var newStar = cc.instantiate(this.star);
        this.node.addChild(newStar);
        newStar.setPosition(this.starPosition());
    }

    starPosition(): cc.Vec2 {
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    }
}
