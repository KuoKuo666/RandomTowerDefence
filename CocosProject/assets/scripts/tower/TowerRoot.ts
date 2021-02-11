import { _decorator, Component, Prefab, instantiate, Node } from 'cc'
import { EnemyRoot } from '../enemy/EnemyRoot'
import { Tower } from './Tower'
const { ccclass, property } = _decorator

@ccclass('TowerRoot')
export class TowerRoot extends Component {

    @property({ type: [Prefab] })
    towerPrefab: Prefab[] = []

    @property({ type: EnemyRoot })
    enemyRoot: EnemyRoot | undefined = undefined

    // 塔容器
    towers: Node[] = []

    // 平面 y = 0
    createTower (x: number, z: number, level: number) {
        const tower = instantiate(this.towerPrefab[level])
        this.node.addChild(tower)
        // 注入实例
        const comp = tower.getComponent(Tower)
        comp && comp.init(this, 1)
        tower.setPosition(x, 0, z)
        this.towers.push(tower)
    }
}
