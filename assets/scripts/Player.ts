const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // In pixels.
    @property
    jumpHeight: number = 0;

    // In seconds.
    @property
    jumpDuration: number = 0;

    // In pixels per second.
    @property
    maxSpeed: number = 0;

    // Horizontal speed.
    xSpeed: number = 0;

    // In pixels per second.
    @property
    accel: number = 0;

    onLoad() {
        let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        let jumpAction = cc.repeatForever(cc.sequence(jumpUp, jumpDown));
        this.node.runAction(jumpAction);
    }

    start() {

    }

    // update (dt) {}
}
