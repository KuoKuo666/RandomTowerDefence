
import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

/** 敌人路线图块 */
@ccclass('MapRoad')
export class MapRoad extends Component {

    @property({ type: Node })
    topNode: Node | undefined = undefined

    @property({ type: Node })
    bottomNode: Node | undefined = undefined

    @property({ type: Node })
    leftNode: Node | undefined = undefined

    @property({ type: Node })
    rightNode: Node | undefined = undefined

    renderTop(isShow: boolean) {
        if (!this.topNode) { return }
        this.topNode.active = isShow
    }

    renderBottom(isShow: boolean) {
        if (!this.bottomNode) { return }
        this.bottomNode.active = isShow
    }

    renderLeft(isShow: boolean) {
        if (!this.leftNode) { return }
        this.leftNode.active = isShow
    }

    renderRight(isShow: boolean) {
        if (!this.rightNode) { return }
        this.rightNode.active = isShow
    }

}
