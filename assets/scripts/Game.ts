
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

    start(): void {
    }
}
