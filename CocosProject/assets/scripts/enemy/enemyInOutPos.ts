import { _decorator, Component, Node, tween, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('EnemyInOutPos')
export class EnemyInOutPos extends Component {
    
    @property({ type: Node })
    enemyInPosNode: Node | undefined = undefined

    @property({ type: Node })
    enemyOutPosNode: Node | undefined = undefined

    start () {
        // 旋转动作
        if (this.enemyInPosNode) {
            tween(this.enemyInPosNode).repeatForever(
                tween().by(1, { eulerAngles: new Vec3(0, -100, 0) })
            ).start()
        }
        if (this.enemyOutPosNode) {
            tween(this.enemyOutPosNode).repeatForever(
                tween().by(1, { eulerAngles: new Vec3(0, -100, 0) })
            ).start()
        }
    }
}
