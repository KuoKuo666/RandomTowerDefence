/**  
 * 地图数据
 * 12 x 12 的地图
 * 除了 road 都是普通的 tower 块
 * road 有连接处
 * 0 代表普通塔块， 1 代表路
 * direction 方向 => 上下左右
 **/

export const MapData = {
    info: 'map',
    data: [
        [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1]
    ],
    road: {
        start: [0, 0],
        points: [
            {
                direction: '下',
                dis: 4,
                point: [4, 0]
            },
            {
                direction: '右',
                dis: 11,
                point: [4, 11]
            },
            {
                direction: '上',
                dis: 4,
                point: [0, 11]
            },
            {
                direction: '左',
                dis: 4,
                point: [0, 7]
            },
            {
                direction: '下',
                dis: 11,
                point: [11, 7]
            },
            {
                direction: '右',
                dis: 4,
                point: [11, 11]
            },
            {
                direction: '上',
                dis: 4,
                point: [7, 11]
            },
            {
                direction: '左',
                dis: 11,
                point: [7, 0]
            },
            {
                direction: '下',
                dis: 4,
                point: [11, 0]
            },
            {
                direction: '右',
                dis: 4,
                point: [11, 4]
            },
            {
                direction: '上',
                dis: 11,
                point: [0, 4]
            }
        ]
    }
}
