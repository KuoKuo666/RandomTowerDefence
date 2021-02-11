import { _decorator, Component, Node, Vec2, log, tween, Vec3 } from 'cc'
import { TowerRoot } from './TowerRoot'
const { ccclass, property } = _decorator

@ccclass('Tower')
export class Tower extends Component {
    // 攻击力
    atk = 0
    // 攻击范围 的平方
    rangeSqr = 40 * 40
    // 攻击速度
    speed = 0.3

    // 管理实例
    towerRoot: TowerRoot | undefined = undefined

    // 当前目标
    aim: Node | undefined = undefined

    atking = false

    @property({ type: Node })
    bullet: Node | undefined = undefined

    init(context: TowerRoot, atk: number) {
        this.towerRoot = context
        this.atk = atk
    }

    atkAim() {
        if (!this.aim || !this.bullet || this.atking) { return }
        this.atking = true
        // 子弹初始位置
        const startPos = this.bullet.getPosition()
        const deltaXYZ = this.aim.position.subtract(this.node.position)
        // 计算与目标的 xyz 距离
        tween(this.bullet).by(
            this.speed, { position: new Vec3(deltaXYZ.x, 0, deltaXYZ.z) }
        ).call(() => {
            this.atking = false
            this.bullet && this.bullet.setPosition(startPos)
        }).start()
    }

    update(deltaTime: number) {
        if (this.towerRoot && this.towerRoot.enemyRoot) {
            const towerPos = new Vec2(this.node.position.x, this.node.position.z)
            // 先判断当前目标有没有出去
            if (this.aim) {
                const aimPos = new Vec2(this.aim.position.x, this.aim.position.z)
                if (towerPos.subtract(aimPos).lengthSqr() <= this.rangeSqr) {
                    // 继续攻击
                    this.atkAim()
                    return
                }
            }
            // 寻找范围内敌人
            const enemys = this.towerRoot.enemyRoot.enemys
            this.aim = undefined
            for (let i = 0; i < enemys.length; i++) {
                const enemyPos = new Vec2(enemys[i].position.x, enemys[i].position.z)
                if (towerPos.subtract(enemyPos).lengthSqr() <= this.rangeSqr) {
                    this.aim = enemys[i]
                    break
                }
            }
            this.atkAim()
        }
    }
}
