const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    // In pixels.
    @property
    pickRadius: number = 0;

}
