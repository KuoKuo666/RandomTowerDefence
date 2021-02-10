import { _decorator, Component, Node, systemEvent, SystemEventType, EventMouse, log, Vec3, EventKeyboard, macro } from 'cc'
const { ccclass, property } = _decorator

@ccclass('CameraControl')
export class CameraControl extends Component {

    isWDown = false
    isSDown = false
    isADown = false
    isDDown = false

    // 视角移动速率
    speed = 30

    onLoad () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this)
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this)
        systemEvent.on(SystemEventType.MOUSE_WHEEL, this.onMouseWheel, this)
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.w:
                this.isWDown = true
            break
            case macro.KEY.s:
                this.isSDown = true
            break
            case macro.KEY.a:
                this.isADown = true
            break
            case macro.KEY.d:
                this.isDDown = true
            break
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.w:
                this.isWDown = false
            break
            case macro.KEY.s:
                this.isSDown = false
            break
            case macro.KEY.a:
                this.isADown = false
            break
            case macro.KEY.d:
                this.isDDown = false
            break
        }
    }

    onMouseWheel (event: EventMouse) {
        // 视角拉近与拉远
        const size = 0.01
        const moveDt = new Vec3(0, -event.getScrollY() * size, 0)
        this.node.translate(moveDt)
    }

    onDestroy () {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this)
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this)
        systemEvent.off(SystemEventType.MOUSE_WHEEL, this.onMouseWheel, this)
    }

    update (deltaTime: number) {
        if (this.isWDown) {
            const moveDt = new Vec3(0, 0, -deltaTime * this.speed)
            this.node.translate(moveDt)
        }
        if (this.isSDown) {
            const moveDt = new Vec3(0, 0, deltaTime * this.speed)
            this.node.translate(moveDt)
        }
        if (this.isADown) {
            const moveDt = new Vec3(-deltaTime * this.speed, 0, 0)
            this.node.translate(moveDt)
        }
        if (this.isDDown) {
            const moveDt = new Vec3(deltaTime * this.speed, 0, 0)
            this.node.translate(moveDt)
        }
    }

}
