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

    // Flag to move right or left.
    goLeft: boolean = false;

    // Flag to move right or left.
    goRight: boolean = false;

    // Number of pixels from the centre of the scene to its edge.
    offScreen = 0

    onLoad(): void {
        this.offScreen = this.node.parent.width / 2 + this.node.width / 2;
        this.node.runAction(this.constructJumpAction());
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    update(dt: number): void {
        if (this.goRight) {
            this.xSpeed += this.accel * dt;
        } else if (this.goLeft) {
            this.xSpeed -= this.accel * dt;
        }
        if (Math.abs(this.xSpeed) > this.maxSpeed) {
            this.xSpeed = this.maxSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        this.node.x += this.xSpeed * dt;
        if (this.node.position.x < -this.offScreen) {
            this.node.x = this.offScreen;
        } else if (this.node.position.x > this.offScreen) {
            this.node.x = -this.offScreen;
        }
    }

    constructJumpAction(): cc.ActionInterval {
        let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCircleActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCircleActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.goLeft = true;
                break;
            case cc.macro.KEY.right:
                this.goRight = true;
                break;
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.goLeft = false;
                break;
            case cc.macro.KEY.right:
                this.goRight = false;
                break;
        }
    }

    onDestroy(): boolean {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        return true;
    }
}
