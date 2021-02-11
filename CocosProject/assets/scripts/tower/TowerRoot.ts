import { _decorator, Component, Prefab, instantiate, log } from 'cc'
const { ccclass, property } = _decorator

@ccclass('TowerRoot')
export class TowerRoot extends Component {

    @property({ type: [Prefab] })
    towerPrefab: Prefab[] = []

    start () {
        // [3]
    }

    // 平面 y = 0
    createTower (x: number, z: number, level: number) {
        const tower = instantiate(this.towerPrefab[level])
        this.node.addChild(tower)
        log(tower)
        tower.setPosition(x, 0, z)
    }
}
