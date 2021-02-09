
import { _decorator, Component, Prefab, log, error, instantiate } from 'cc'
import { MapData } from '../../config/map'
import { MapRoad } from './MapRoad'
const { ccclass, property } = _decorator

@ccclass('MapCreator')
export class MapCreator extends Component {
 
    @property({ type: Prefab })
    mapTowerPrefab: Prefab | undefined = undefined

    @property({ type: Prefab })
    mapRoadPrefab: Prefab | undefined = undefined

    start () {
        log(this.node)
        // 取地图数据
        const mapData = MapData.data
        // 遍历地图数据进行路块创建
        mapData.forEach((rowMapData, rowIndex) => {
            rowMapData.forEach((type, colIndex) => {
                // 普通块
                if (type === 0) {
                    this.createTowerBlock(rowIndex, colIndex)
                } else {
                    // 路块
                    this.createRoadBlock(rowIndex, colIndex, mapData)
                }
            })
        })
    }

    createTowerBlock(row: number, col: number) {
        if (!this.mapTowerPrefab) {
            error('找不到 mapTowerPrefab')
            return
        }
        const mapTowerNode = instantiate(this.mapTowerPrefab)
        this.node.addChild(mapTowerNode)
        mapTowerNode.setPosition(col * 10, -0.5, row * 10)
    }

    createRoadBlock(row: number, col: number, mapData: number[][]) {
        if (!this.mapRoadPrefab) {
            error('找不到 mapRoadPrefab')
            return
        }
        const mapRoadNode = instantiate(this.mapRoadPrefab)
        this.node.addChild(mapRoadNode)
        mapRoadNode.setPosition(col * 10, -0.5, row * 10)
        const comp = mapRoadNode.getComponent(MapRoad)
        // 要判断上下左右拼接处
        if (mapData[row-1] && mapData[row-1][col] === 1) {
            comp && comp.renderTop(true)
        }
        if (mapData[row+1] && mapData[row+1][col] === 1) {
            comp && comp.renderBottom(true)
        }
        if (mapData[col-1] && mapData[row][col-1] === 1) {
            comp && comp.renderLeft(true)
        }
        if (mapData[col+1] && mapData[row][col+1] === 1) {
            comp && comp.renderRight(true)
        }
    }
}
