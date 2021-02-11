import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, EventMouse, Camera, Vec3, log, error, Vec2, tween, Tween, TERRAIN_HEIGHT_BASE } from 'cc'
import { MapData } from '../../config/map'
import { TowerRoot } from '../tower/TowerRoot'
const { ccclass, property } = _decorator

@ccclass('UserControl')
export class UserControl extends Component {

    @property({ type: TowerRoot })
    towerRoot: TowerRoot | undefined = undefined

    /** 建造标志模型 */
    @property({ type: Node })
    buidSignNode: Node | undefined = undefined

    /** 相机节点 */
    @property({ type: Camera })
    cameraIn3D: Camera | undefined = undefined

    // 是否进入建造模式
    isInBuildMode = false

    // 鼠标位置缓存
    mousePos = new Vec2()
    buildIndex = new Vec2()

    // 旋转 tween
    rotateTween: Tween<Node> | undefined = undefined

    onLoad () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this)
        systemEvent.on(SystemEventType.MOUSE_MOVE, this.onMouseMove, this)
        systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
    }

    onMouseMove (event: EventMouse) {
        this.mousePos.set(event.getLocationX(), event.getLocationY())
        if (!this.isInBuildMode) { return }
        if (this.cameraIn3D) {
            const ray = this.cameraIn3D.screenPointToRay(this.mousePos.x, this.mousePos.y)
            // 取摄像机的高度
            const height = this.cameraIn3D.node.parent!.position.y
            // 根据 y 的值计算射线与 0 位处交点射线长度
            const len = -(height / ray.d.y)
            // 求坐标
            const result = new Vec3()
            Vec3.scaleAndAdd(result, ray.o, ray.d, len)
            // 取当前 x 与 z 值
            this.renderBuildSignPos(result.x, result.z)
        }
    }

    onMouseDown (event: EventMouse) {
        // 鼠标右键取消
        if (event.getButton() === 2) {
            if (this.isInBuildMode) {
                this.outBuildMode()
            }
        }
        // 鼠标左键建造
        if (event.getButton() === 0) {
            if (this.isInBuildMode) {
                log('建造: ' + this.buildIndex.toString())
                if (this.towerRoot) {
                    this.towerRoot.createTower(this.buildIndex.y * 10, this.buildIndex.x * 10, 0)
                    // 建造完毕退出建造模式
                    this.outBuildMode()
                }
            }
        }
    }

    inBuildMode () {
        this.isInBuildMode = true
        if (this.buidSignNode) {
            this.buidSignNode.active = true
            this.renderBuildSignPos(this.mousePos.x, this.mousePos.y)
            // 旋转
            if (this.rotateTween) {
                this.rotateTween.start()
            } else {
                this.rotateTween = tween(this.buidSignNode).repeatForever(
                    tween().by(1, { eulerAngles: new Vec3(0, -200, 0) })
                ).start()
            }
        }
    }

    /** 需要根据坐标算出对应的塔防位置 */
    renderBuildSignPos (x: number, z: number) {
        if (this.buidSignNode) {
            // 10 个一格，取整
            const colIndex = Math.floor((x + 5) / 10)
            const rowIndex = Math.floor((z + 5) / 10)
            // 判断下地铁数据，在 路上 跳过
            const mapData = MapData
            if (mapData.data[rowIndex] && mapData.data[rowIndex][colIndex] === 0) {
                this.buildIndex.set(rowIndex, colIndex)
                this.buidSignNode.setPosition(colIndex * 10, 0, rowIndex * 10)
            }
        }
    }

    outBuildMode () {
        this.isInBuildMode = false
        if (this.buidSignNode) {
            this.buidSignNode.active = false
        }
        if (this.rotateTween) {
            this.rotateTween.stop()
        }
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.q:
                // 新建
                this.inBuildMode()
            break
            case macro.KEY.e:
                // 删除
            break
            case macro.KEY.space:
                // 合成
            break
            case macro.KEY.escape:
                // 取消
                this.outBuildMode()
            break
        }
    }

    onDestroy () {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this)
        systemEvent.off(SystemEventType.MOUSE_WHEEL, this.onMouseMove, this)
        systemEvent.off(SystemEventType.MOUSE_DOWN, this.onMouseDown, this)
    }
}
