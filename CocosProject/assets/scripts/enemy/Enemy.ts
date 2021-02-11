import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Enemy')
export class Enemy extends Component {

    hp = 100

    reduceHp(damage: number) {
        this.hp -= damage
    }

}
