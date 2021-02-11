import { _decorator, Component, Node, tween, Vec3, Prefab, instantiate } from 'cc'
import { MapData } from '../../config/map'
const { ccclass, property } = _decorator

@ccclass('EnemyRoot')
export class EnemyRoot extends Component {

    @property({ type: Node })
    enemyInPosNode: Node | undefined = undefined

    @property({ type: Node })
    enemyOutPosNode: Node | undefined = undefined

    @property({ type: Prefab })
    enemyPrefab: Prefab | undefined = undefined

    // 敌人容器
    enemys: Node[] = []

    start() {
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

        this.createEnemy()
    }

    createEnemy() {
        if (!this.enemyPrefab) { return }
        const enemy = instantiate(this.enemyPrefab)
        this.node.addChild(enemy)
        enemy.setPosition(this.index2Pos(0, 0))
        // 按照路线运动
        const timeScale = 0.8
        const enemyAction = tween(enemy)
        const mapData = MapData
        mapData.road.points.forEach(ele => {
            enemyAction.call(() => { this.renderEnemyDir(enemy, ele.direction) })
            enemyAction.to(ele.dis * timeScale, { position: this.index2Pos(ele.point[0], ele.point[1]) })
        })
        // 走完销毁时扣血
        enemyAction.call(() => {
            // 扣血
            this.destroyEnemy(enemy)
        })
        enemyAction.start()

        // 装入敌人
        this.enemys.push(enemy)
    }

    destroyEnemy(enemy: Node) {
        const index = this.enemys.indexOf(enemy)
        if (index !== -1) {
            this.enemys.splice(index, 1)
        }
        enemy.destroy()
    }

    renderEnemyDir(enemy: Node, dir: string) {
        let eulerAngles: Vec3
        switch (dir) {
            case '上':
                eulerAngles = new Vec3(0, 180, 0)
            break
            case '下':
                eulerAngles = new Vec3(0, 0, 0)
            break
            case '左':
                eulerAngles = new Vec3(0, -90, 0)
            break
            case '右':
                eulerAngles = new Vec3(0, 90, 0)
            break
        }
        enemy.eulerAngles = eulerAngles!
    }

    index2Pos(indexX: number, indexY: number) {
        return new Vec3(indexY * 10, 0, indexX * 10)
    }
}
